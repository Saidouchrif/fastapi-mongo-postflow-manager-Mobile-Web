from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.schemas import PostIn, PostOut, PostUpdate
from app.models.post import (
    get_posts_collection,
    mongo_to_post_out,
    build_insert_doc,
    build_update_doc,
)

router = APIRouter(tags=["posts"])
posts = get_posts_collection()

@router.get("/api/posts", response_model=list[PostOut])
def get_all_posts():
    docs = list(posts.find().sort("created_at", -1))
    return [mongo_to_post_out(doc) for doc in docs]

@router.get("/api/posts/{post_id}", response_model=PostOut)
def get_post(post_id: str):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    doc = posts.find_one({"_id": ObjectId(post_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return mongo_to_post_out(doc)

@router.post("/api/posts", response_model=PostOut)
def create_post(post: PostIn):
    doc = build_insert_doc(post.title, post.content)
    res = posts.insert_one(doc)
    created = posts.find_one({"_id": res.inserted_id})
    return mongo_to_post_out(created)

@router.put("/api/posts/{post_id}", response_model=PostOut)
def update_post(post_id: str, post: PostUpdate):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    update = build_update_doc(post.title, post.content)
    res = posts.update_one({"_id": ObjectId(post_id)}, update)
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    updated = posts.find_one({"_id": ObjectId(post_id)})
    return mongo_to_post_out(updated)

@router.delete("/api/posts/{post_id}")
def delete_post(post_id: str):
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    res = posts.delete_one({"_id": ObjectId(post_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully."}
