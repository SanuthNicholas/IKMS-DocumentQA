from .api import app  # import the FastAPI instance from api.py

# Health check endpoint for monitoring purposes
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Backend is running!"}