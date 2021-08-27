def userEntity(item) -> dict:
    return {
        "id": str(item['_id']),
        "name": item['name'],
        "email": item['email'],
        "gender": item['gender'],
        "profile": item['image']
    }


def userPassword(item) -> dict:
    return {
        "id": str(item['_id']),
        "password": item['password']
    }


def userLogin(item) -> dict:
    return {
        "id": str(item['_id']),
        "password": item['password']
    }


def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]
