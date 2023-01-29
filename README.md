1. APIs Test>>

Curl

curl -X 'POST' \
  'http://127.0.0.1:8000/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "user1",
  "email": "user1@gmail.com",
  "name": "User1",
  "password": "password",
  "phone_number": "9876543210",
  "birth": "01-01-2021",
  "gender": "MALE",
  "profile": "base64"
}'


Server response
Code	Details
200	
Response body
{
  "detail": "Successfully data saved."
}
Response headers
 content-length: 37 
 content-type: application/json 
 date: Sun,29 Jan 2023 18:26:28 GMT 
 server: uvicorn 

 2. APIs Test>>

 Curl

curl -X 'POST' \
  'http://127.0.0.1:8000/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "user1",
  "password": "password"
}'

Server response
Code	Details
200	
Response body
{
  "detail": "Successfully Login.",
  "result": {
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNjc1MDIyMjM1fQ.E46RUorF5QQBZQRd-dLKibvCbm40d2G3hYy-eNUXa7A"
  }
}
Response headers
 content-length: 214 
 content-type: application/json 
 date: Sun,29 Jan 2023 19:42:14 GMT 
 server: uvicorn