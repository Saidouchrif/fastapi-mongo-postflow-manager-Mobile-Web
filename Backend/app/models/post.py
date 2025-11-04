from app.db import db
from pymongo.errors import CollectionInvalid

try:
    if "posts" not in db.list_collection_names():
        db.create_collection("posts")
        print("Collection 'posts' created successfully.")
    else:
        print("Collection 'posts' already exists.")
except CollectionInvalid:
    print("Failed to create collection 'posts'. It may already exist.")