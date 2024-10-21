# nodejs-CRUD-API

### Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository: https://github.com/nikola2390/nodejs-CRUD-API
3. Go to folder `nodejs-CRUD-API`
4. Checkout to `dev` branch
5. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)
6. Rename `.env.example` file to `.env`
7. Start development mode in accordance to scripts in `package.json`
8. For requests you can use [`Postman`](https://www.postman.com/)
9. Users have following properties:
   - `id` — unique identifier
   - `username` — user's name (**required**)
   - `age` — user's age (**required**)
   - `hobbies` — user's hobbies (**required**)
10. To get all users use **GET** method and `api/users` endpoint
11. To get specific user use **GET** method and `api/users/{userId}` endpoint
12. To create user use **POST** method and `api/users` endpoint
13. To update user use **PUT** method and `api/users/{userId}` endpoint. You should provide all fields which marked as **required**
14. To delete user use **DELETE** method and `api/users/{userId}` endpoint
