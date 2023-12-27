# mern-auth
`mern-auth is an application utilizing MERN Stack`

## `setup project`

First download the project
### `cd into the main project folder mern-auth`

Install node_modules for the project
#### `npm install or yarn install`

Change directory to frontend
#### `cd frontend`

Then install node_modes for the frontend
#### `npm install or yarn install`

Continuing in the frontend, create .env file with the variables
#### `VITE_FIREBASE_API_KEY`
#### `VITE_FIREBASE_API_ID`

Change directories to the backend folder, create config folder,
and inside config folder create config.env file with the variables
#### `PORT`
#### `NODE_ENV`
#### `FRONTEND_URL`
#### `JWT_SECRET_KEY`
#### `API_ENV`
#### `MONGO_DB_URI`

Configure MongoDB for the backend
Configure Firebase for the frontend

Then to start app
`npm run dev or yarn dev`

Concurrently package is install for the project so both backend and
frontend can be viewed from one command
`frontend -> ` http://localhost:5173/
`backend  -> ` http://127.0.0.1:5000/api/v1.0/ 

#### `mern-app image`
![mern-auth](https://github.com/MAbdurahman/mern-auth/assets/20928980/7316a73e-d231-445a-b743-e2d5e262e050)