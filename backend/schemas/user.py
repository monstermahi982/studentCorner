def userEntity(item) -> dict:
    return {
        "id": str(item['_id']),
        "name": item['name'],
        "age": item['age'],
        "gender": item['gender']
    }


def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]
