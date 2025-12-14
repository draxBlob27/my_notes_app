from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from qdrant_client import models, QdrantClient
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel
import uuid
# python -m uvicorn main:app --reload

class NoteData(BaseModel):
    note_id: str
    user_id: str
    topic: str
    tags: str
    content: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
client = QdrantClient(path="/Users/sanilparmar/Desktop/notes-app/backend-python/vector_embeddings")
encoder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

@app.get("/")
def home():
    return {"message" : "Welcome to python backend"}

def db_exists(db_name):
    return client.collection_exists(db_name)

@app.post("/save_embeddings")
def add_embeddings(data: NoteData):
    combined_text = f"{data.topic} {data.tags} {data.content}"
    embeddings = encoder.encode(combined_text).tolist()
    if not db_exists("my_notes"):
        client.create_collection(
            collection_name="my_notes",
            vectors_config=models.VectorParams(
                size=encoder.get_sentence_embedding_dimension(),  # Vector size is defined by used model
                distance=models.Distance.COSINE,
                ),
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
    user_filter = models.Filter(
        must = [models.FieldCondition(key = "user_id", match=models.MatchValue(value=user_id))]
    )
    
    hits = client.query_points(
        collection_name="my_notes",
        query=encoder.encode(query).tolist(),
        limit= 5,
        query_filter = user_filter,
        with_payload=True,
    ).points

    for hit in hits:
        print("Score:", hit.score)

    return [hit.payload['note_id'] for hit in hits]