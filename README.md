
# Student katta :-

A small PROFILE checking web application for users like mini linkedin. 


## Demo
  https://student-katha.herokuapp.com/
## Tech Stack

**Client :** React, Material UI, Html5, Css3

**Server :** FastAPI (python3)

**Databse :** Mongodb atlas

**Deployment :** Heroku


  
## Installation and Run locally

Install my-project with npm

```bash
    git clone https://github.com/monstermahi982/studentCorner.git
```
```bash
    cd studentCorner
```
Start Backend server
```bash
    cd backend
    pip3 install -m venv venv
    pip install -r requirement.txt
    uvicorn main:app --reload
```
  http://localhost:8000/docs/

Start Frontend app
```bash
    cd Frontend
    npm install
    npm start
```
  https://localhost:3000/student/


## Deployment

To deploy this project on heroku run

```bash
  heroku login
```
```bash
  cd my-project/
```
```bash
  git init
```
```bash
  heroku git:remote -a project_name

```
```bash
  git add .
```
```bash
  git commit -am "monster world"
```
```bash
  git push heroku master
```
  
