from pydantic import BaseModel
from typing import Optional


class AddStudent(BaseModel):
    name: str
    email: str
    password: str
    gender: str
    image: Optional[str] = ""


class UpdateStudent(BaseModel):
    name: Optional[str]
    email: Optional[str]


class UpdatePassword(BaseModel):
    oldPassword: str
    newPassword: str


class StudentLogin(BaseModel):
    email: Optional[str] = "monster@gmail.com"
    password: Optional[str] = ""
