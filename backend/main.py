import os
from bson.objectid import ObjectId
from pymongo import MongoClient
from typing import Optional
from fastapi import FastAPI, File, UploadFile, Request, Response
from pydantic import BaseModel
import datetime
from schemas.user import userEntity, usersEntity, userPassword, userLogin
from fastapi.staticfiles import StaticFiles
from models.Student import UpdateStudent, AddStudent, UpdatePassword, StudentLogin
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from starlette.responses import RedirectResponse


# initialize
app = FastAPI()

# added cor
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3000/student",
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
path = "/home/mahesh/projects/fastapi/app1/backend/static/images"

# html files
templates = Jinja2Templates(directory="templates")

# database connection
URL = "mongodb+srv://monstermahi:monstermahi@cluster0.cf4ii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = MongoClient(URL)
db = client['studentCorner']
collection = db['student']


# routes

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/students")
async def fetch_all_student():
    return usersEntity(collection.find())


@app.get("/student/{id}")
async def fetch_one_student(id):
    try:
        return userEntity(collection.find_one({"_id": ObjectId(id)}))
    except:
        return {"data": "wrongId"}


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
            "image": "static/images/"+file.filename
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


@app.post('/updatepassword/')
def UpdatePassword(student: UpdatePassword):
    try:
        data = userPassword(collection.find_one(
            {"password": student.oldPassword}))
        collection.find_one_and_update({"_id": ObjectId(data['id'])}, {
            "$set": {
                "password": student.newPassword
            }
        })
        return {"data": "password updated"}
    except:
        return {"data": "notFound"}


@app.post('/student/login')
def studentLogin(login: StudentLogin):
    try:
        data = userLogin(collection.find_one(
            {"email": login.email}))
        if data['password'] == login.password:
            return {"data": data['id']}
        else:
            return {"data": "WrongPassword"}

    except:
        return {"data": "WrongEmail"}


class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name


@app.get("/login")
@app.get("/register")
@app.get("/forget-password")
@app.get("/student")
async def redirect():
    url = app.url_path_for("home")
    response = RedirectResponse(url=url)
    return response
