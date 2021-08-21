from fastapi import APIRouter

from models.user import Student
from config.db import collection
from schemas.user import userEntity, usersEntity

user = APIRouter()


@user.get('/')
async def student_get():
    return usersEntity(collection.find())
