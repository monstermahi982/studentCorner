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
    gender: Optional[str]


class UpdatePassword(BaseModel):
    oldPassword: str
    newPassword: str
