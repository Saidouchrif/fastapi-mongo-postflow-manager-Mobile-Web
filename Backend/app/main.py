from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.posts import router as posts_router

app = FastAPI(
    title="PostFlow Manager API",
    description="API simple de gestion des posts (FastAPI + MongoDB)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts_router)

@app.get("/")
def home():
    return {"message": "✅ API PostFlow Manager is running successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
