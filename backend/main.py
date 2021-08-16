from typing import Optional
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/about/{id}")
def read_root(id):
    return {"Hello": f"this is number {id}"}
