import os
from bson.objectid import ObjectId
from pymongo import MongoClient
from typing import Optional
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import datetime
from schemas.user import userEntity, usersEntity
from fastapi.staticfiles import StaticFiles

# initialize
app = FastAPI()

# file uploads
app.mount("/static", StaticFiles(directory="static"), name="static")
path = "/home/mahesh/projects/fastapi/app1/backend/static"

# database connection
client = MongoClient('localhost', 27017)
db = client['studentCorner']
collection = db['student']

# class models


class Student(BaseModel):
    name: str
    age: int
    rollno: int
    gender: str


class UpdateStudent(BaseModel):
    name: Optional[str]
    age: Optional[int]
    roll: Optional[int]
    gender: Optional[str]


# routes
@app.get("/student")
def fetch_all_student():
    return usersEntity(collection.find())


@app.get("/student/{id}")
def fetch_one_student(id):
    return userEntity(collection.find_one({"_id": ObjectId(id)}))


@app.post('/student')
async def addStudent(request: Student):
    collection.insert_one(dict(request))
    return {"data": "success"}


@app.put('/student/{id}')
def UpdateStudent(request: UpdateStudent, id):
    collection.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": dict(request)
    })
    return userEntity(collection.find_one({"_id": ObjectId(id)}))


@app.delete("/student/{id}")
def student_delete(id):
    collection.find_one_and_delete(
        {"_id": ObjectId(id)})
    return {"data": "deleted"}


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    filePath = os.path.join(path, file.filename)
    with open(filePath, 'wb+') as f:
        f.write(contents)
        f.close()
    return {"filename": "static/"+file.filename}
