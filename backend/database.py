from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client['studentCorner']
collection = db['student']

post = {
    "name": "onkar torne",
    "age": 19,
    "roll npo": 6,
    "gender": "male"
}

# insert = collection.insert_one(post)

# print(collection.find({"gender": "male"}))
# print(collection.count())


for data in collection.find({"gender": "female"}):
    print(data)
