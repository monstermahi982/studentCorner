import os
from bson.objectid import ObjectId
from pymongo import MongoClient
from typing import Optional
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import datetime
from schemas.user import userEntity, usersEntity, userPassword
from fastapi.staticfiles import StaticFiles
from models.Student import UpdateStudent, AddStudent, UpdatePassword
from fastapi.middleware.cors import CORSMiddleware

# initialize
app = FastAPI()

# added cor
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# file uploads
app.mount("/static", StaticFiles(directory="static"), name="static")
path = "/home/mahesh/projects/fastapi/app1/backend/static"

# database connection
client = MongoClient('localhost', 27017)
db = client['studentCorner']
collection = db['student']


# routes
@app.get("/students")
async def fetch_all_student():
    return usersEntity(collection.find())


@app.get("/student/{id}")
async def fetch_one_student(id):
    return userEntity(collection.find_one({"_id": ObjectId(id)}))


@app.post('/student')
async def addStudent(student: AddStudent):
    collection.insert_one(dict(student))
    return {"data": student}


@app.put('/student/{id}')
async def UpdateStudent(student: UpdateStudent, id):
    collection.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": dict(student)
    })
    return userEntity(collection.find_one({"_id": ObjectId(id)}))


@app.put('/student/profile/{id}')
async def UpdateStudentProfile(id, file: UploadFile = File(...)):
    contents = await file.read()
    filePath = os.path.join(path, file.filename)
    with open(filePath, 'wb+') as f:
        f.write(contents)
        f.close()
    collection.find_one_and_update({"_id": ObjectId(id)}, {
        "$set": {
            "image": "static/"+file.filename
        }
    })
    return userEntity(collection.find_one({"_id": ObjectId(id)}))


@app.delete("/student/{id}")
async def student_delete(id):
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


@app.post('/updatepassword/{id}')
def UpdatePassword(id, student: UpdatePassword):
    data = userPassword(collection.find_one({"_id": ObjectId(id)}))
    if(data['password'] == student.oldPassword):
        collection.find_one_and_update({"_id": ObjectId(id)}, {
            "$set": {
                "password": student.newPassword
            }
        })
        return {"data": "password updated"}
    else:
        return {"data": "wrong password"}
