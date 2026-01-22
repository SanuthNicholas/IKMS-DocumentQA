---

# IKMS DocumentQA 📄🤖

IKMS DocumentQA is a full-stack AI-powered application that allows users to **upload PDF documents and ask questions** based on their content. The system indexes documents using embeddings and retrieves accurate, context-aware answers using OpenAI models and a vector database.

---

## 🚀 Live Demo

* **Frontend:** [https://ikms-documentqa-frontend.onrender.com](https://ikms-documentqa-frontend.onrender.com)
* **Backend API:** [https://ikms-documentqa-backend.onrender.com](https://ikms-documentqa-backend.onrender.com)

---

## ✨ Features

* Upload and index PDF documents
* Semantic search and question answering
* OpenAI-powered responses
* Vector-based document retrieval (Pinecone)
* Modern frontend with clean UI
* Fully deployed on Render (frontend + backend)

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* JavaScript
* Fetch API
* Deployed as **Static Site** on Render

### Backend

* Python 3.10
* FastAPI
* LangChain
* OpenAI API
* Pinecone
* Uvicorn
* Deployed as **Web Service** on Render

---

## 📁 Project Structure

```
IKMS-DocumentQA/
│
├── ikms-frontend/
│   ├── src/
│   ├── public/
│   ├── dist/              # build output (not committed)
│   ├── .gitignore
│   └── package.json
│
├── ikms-backend/
│   ├── src/
│   │   └── app/
│   │       └── api.py
│   ├── data/uploads/
│   ├── requirements.txt
│   ├── .env               # not committed
│   └── .gitignore
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`ikms-backend`)

Create a `.env` file (DO NOT commit this):

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL_NAME=gpt-4o-mini
OPENAI_EMBEDDING_MODEL_NAME=text-embedding-3-small

PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=ikms-final-project

RETRIEVAL_K=4
```

These same values must be added as **Environment Variables on Render** for the backend service.

---

### Frontend (`ikms-frontend`)

Environment variable (set on Render):

```
VITE_API_BASE_URL=https://ikms-documentqa-backend.onrender.com
```

Usage in code:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## 🧑‍💻 Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/SanuthNicholas/IKMS-DocumentQA.git
cd IKMS-DocumentQA
```

---

### 2️⃣ Backend Setup

```bash
cd ikms-backend
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
```

Run backend:

```bash
uvicorn src.app.api:app --reload --port 8001
```

Backend will be available at:

```
http://localhost:8001
```

---

### 3️⃣ Frontend Setup

```bash
cd ikms-frontend
npm install
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## 📦 Build Frontend for Production

```bash
npm run build
```

This generates the `dist/` folder (used by Render for deployment).

---

## ☁️ Deployment (Render)

### Backend (Web Service)

* Root Directory: `ikms-backend`
* Build Command:

  ```bash
  pip install -r requirements.txt
  ```
* Start Command:

  ```bash
  uvicorn src.app.api:app --host 0.0.0.0 --port $PORT
  ```
* Add all backend environment variables in Render dashboard

---

### Frontend (Static Site)

* Root Directory: `ikms-frontend`
* Build Command:

  ```bash
  npm install && npm run build
  ```
* Publish Directory:

  ```bash
  dist
  ```
* Add `VITE_API_BASE_URL` environment variable
* Redeploy after setting env vars

---

## 📘 How to Use the App

1. Open the frontend URL
2. Upload a PDF document
3. Wait until indexing completes
4. Ask questions related to the uploaded document
5. Receive AI-generated answers based on document content

---

## 🛡️ Security Notes

* `.env` files are ignored via `.gitignore`
* API keys are never committed to GitHub
* All secrets are managed through Render Environment Variables

---

## 📌 Future Improvements

* User authentication
* Multiple document support
* Document management dashboard
* Streaming responses
* File type expansion (DOCX, TXT)

---

## 👨‍💻 Author

**Sanuth Nicholas**
AI / Full-Stack Developer

---

