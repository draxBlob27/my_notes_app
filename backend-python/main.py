from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qdrant_client import models, QdrantClient
# from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
import uuid
from dotenv import load_dotenv
import os
import requests

# python -m uvicorn main:app --reload
load_dotenv(dotenv_path='/Users/sanilparmar/Desktop/notes-app/.env.local')

class NoteData(BaseModel):
    note_id: str
    user_id: str
    topic: str
    tags: str
    content: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
# client = QdrantClient(path="/Users/sanilparmar/Desktop/notes-app/backend-python/vector_embeddings")
client = QdrantClient(
    url=os.getenv("QDRANT_URL"), 
    api_key=os.getenv("QDRANT_KEY"),
)
# encoder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

@app.get("/")
def home():
    return {"message" : "Welcome to python backend"}

def db_exists(db_name):
    return client.collection_exists(db_name)

def get_embeddings(text: str):
    API_URL = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"
    headers = {"Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}
    response = requests.post(API_URL, headers=headers, json={"inputs": text})

    if response.status_code == 200:
        return response.json()[0]
    else:
        raise Exception(f"API Error: {response.status_code}")

@app.post("/save_embeddings")
def add_embeddings(data: NoteData):
    combined_text = f"{data.topic} {data.tags} {data.content}"
    embeddings = get_embeddings(combined_text)
    if not db_exists("my_notes"):
        client.create_collection(
            collection_name="my_notes",
            vectors_config=models.VectorParams(
                size=384,  # Vector size is defined by used model
                distance=models.Distance.COSINE,
                ),
        )

        client.create_payload_index(
            collection_name="my_notes",
            field_name="user_id",
            field_schema=models.PayloadSchemaType.KEYWORD 
        )
    
    payload = {
        "note_id" : data.note_id,
        "user_id" : data.user_id
    }

    client.upload_points(
        collection_name="my_notes",
        points=[
            models.PointStruct(
                id = uuid.uuid4(),
                vector=embeddings,
                payload = payload,
            )
        ],
    )

    return {"status": "success", "note_id": data.note_id, "user_id": data.user_id}

@app.get("/search")
def match_query(query: str, user_id: str):
    query_embedding = get_embeddings(query)
    user_filter = models.Filter(
        must = [models.FieldCondition(key = "user_id", match=models.MatchValue(value=user_id))]
    )
    
    hits = client.query_points(
        collection_name="my_notes",
        query=query_embedding,
        limit= 3,
        query_filter = user_filter,
        with_payload=True,
    ).points

    # for hit in hits:
    #     print(hit.payload, "this: ", hit.score)

    return [hit.payload['note_id'] for hit in hits]