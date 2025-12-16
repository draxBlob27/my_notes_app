AI-Powered Notes Application
============================

A full-stack notes application that evolves from a traditional CRUD system into an AI-assisted knowledge system using semantic search and Retrieval-Augmented Generation (RAG).

This project is built in **phases**, demonstrating progressive system design from fundamentals to applied AI.

Features Overview
-----------------

### Phase A — Core Notes Application

*   User authentication (NextAuth)
    
*   Create, read, update, delete notes
    
*   Notes consist of:
    
    *   topic
        
    *   tags
        
    *   content
        
*   User-scoped data isolation
    
*   Clean separation between frontend and backend
    
*   Stable data model for AI extensions
    

### Phase B — Semantic Search (Embeddings)

*   Vector embeddings generated using:
    
    *   sentence-transformers/all-MiniLM-L6-v2
        
*   topic + tags + content
    
*   Vector storage using **Qdrant**
    
*   Semantic similarity search via cosine distance
    
*   User-level filtering on vector search
    
*   Raw keyword search and semantic search coexist for comparison
    

### Phase C — RAG (Chat with Notes)

*   Chat interface over personal notes
    
*   Retrieval pipeline:
    
    1.  Embed user query
        
    2.  Retrieve top-K relevant notes via vector search
        
    3.  Construct context from retrieved notes
        
    4.  Send structured prompt to LLM
        
*   Prompt constraint:
    
    *   Model must answer strictly using retrieved notes
        
    *   Responds with "I don't know" if context is insufficient
        
*   LLM served via **vLLM** using OpenAI-compatible API
    
*   Model used:
    
    *   meta-llama/Llama-3.1-8B-Instruct
        

Tech Stack
----------

### Frontend

*   Next.js (App Router)
    
*   React
    
*   Axios
    
*   Tailwind CSS
    

### Backend (App API)

*   Next.js API routes
    
*   MongoDB (Mongoose)
    

### AI / ML Services

*   FastAPI (Python)
    
*   Sentence Transformers
    
*   Qdrant (local vector store)
    
*   vLLM (LLM inference server)
    

Architecture
------------

```   
Frontend (Next.js)    
  ├── Notes CRUD    
  ├── Search (raw + semantic)    
  ├── Chat (RAG) 
  
Backend (Next.js API)    
  ├── Auth    
  ├── Notes API    
  ├── User data  AI Service (FastAPI)    
  ├── Embedding generation    
  ├── Vector search (Qdrant)    
  
Semantic filtering  LLM Server (vLLM)    
  ├── Chat completion API
```

Semantic Search Logic
---------------------

*   Raw search:
    
    *   Exact substring matching across topic, tags, and content
        
*   Semantic search:
    
    *   Vector similarity search
        
    *   Returns most relevant notes even without keyword overlap
        

RAG Prompt Structure
--------------------
```
System:  You are an assistant that answers ONLY using the provided notes.  If the answer is not present in the notes, say "I don't know".
User:  Query:<query>   --- NOTES --- <notes>
```

Running the Project (High Level)
--------------------------------

### 1\. Frontend + App API
```   
npm install  npm run dev
```

### 2\. Vector + Embedding Service
```   
python -m uvicorn main:app --reload
```

### 3\. vLLM Server
```
vllm serve "meta-llama/Llama-3.1-8B-Instruct" \   
 --dtype bfloat16 \    
 --max-model-len 8192 \    
 --gpu-memory-utilization 0.95 \    
 --host 0.0.0.0
```

Project Goals
-------------

*   Demonstrate clean full-stack fundamentals
    
*   Show real-world application of embeddings and vector databases
    
*   Implement RAG without abstractions
    
*   Maintain clear system boundaries and extensibility
    
*   Build an interview-ready AI system
    

Future Work (Phase D)
---------------------

*   Performance optimization
    
*   Better UI/UX
    
*   Streaming LLM responses
    
*   Caching and batching embeddings
    

This project is intentionally built without excessive frameworks to emphasize **understanding over abstraction**.
