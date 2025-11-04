import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")
client = MongoClient(MONGO_URL)
db = client[MONGO_DB]
print(f"Connected to MongoDB database: {MONGO_DB} at {MONGO_URL}")