from datetime import datetime
from pymongo import ASCENDING, TEXT
from app.db import db

def get_posts_collection():
    coll_names = db.list_collection_names()
    if "posts" not in coll_names:
        db.create_collection("posts")
        print("Collection 'posts' created successfully.")
    else:
        print("Collection 'posts' already exists.")
    coll = db.get_collection("posts")
    coll.create_index([("created_at", ASCENDING)])
    coll.create_index([("updated_at", ASCENDING)])
    coll.create_index([("title", TEXT), ("content", TEXT)])
    return coll

def mongo_to_post_out(doc: dict) -> dict:
    return {
        "id": str(doc.get("_id")),
        "title": doc.get("title", ""),
        "content": doc.get("content", ""),
        "created_at": doc.get("created_at"),
        "updated_at": doc.get("updated_at"),
    }

def build_insert_doc(title: str, content: str) -> dict:
    return {
        "title": title,
        "content": content,
        "created_at": datetime.utcnow(),
        "updated_at": None,
    }

def build_update_doc(title=None, content=None) -> dict:
    patch = {}
    if title is not None:
        patch["title"] = title
    if content is not None:
        patch["content"] = content
    patch["updated_at"] = datetime.utcnow()
    return {"$set": patch}
