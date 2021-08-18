from bson.objectid import ObjectId
from pymongo import MongoClient
from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
import datetime

app = FastAPI()
client = MongoClient('localhost', 27017)
db = client['studentCorner']
collection = db['student']


class Student(BaseModel):
    name: str
    email: str
    age: int
    year: int
    password: str
    date: str


class UpdateStudent(BaseModel):
    name: Optional[str]
    email: Optional[str]
    age: Optional[int]
    year: Optional[int]
    password: Optional[str]
    date: str


def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "name": student["name"],
        "age": student["age"],
        "gender": student["gender"],
        "rollno": student["rollno"],
    }


@app.get("/student")
def fetch_all_student():
    Studentdata = []
    for data in collection.find():
        Studentdata.append(student_helper(data))
    return {"date": data}


@app.get("/student/{id}")
def fetch_one_student(id):
    return {"Hello": f"this is number {id}"}


@app.post('/student')
async def addStudent(request: Student):
    return {"data": request}


@app.put('/student/{id}')
def UpdateStudent(request: UpdateStudent, id):
    return {"data": request}
