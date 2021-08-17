from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/about/{id}")
def read_root(id, name):
    return {"Hello": f"this is number {id} and name is {name}"}


class Data(BaseModel):
    name: str
    age: int


@app.post("/")
def add(request: Data):
    return {"data": f"name is {request.name} and age is {request.age}"}
