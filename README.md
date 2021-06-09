# Custom cone in Three.js
## Live version: http://agt-ru-cone3d.herokuapp.com/
![screenshot](https://github.com/agt-ru/cone3d/blob/main/cone3d_screenshot.png)
## Features:
- Custom cone geometry written in Three.js with react-three-fiber
- Frontend on React / backend on Node.js & Express
- Custom node module written in C++, which calculates cone triangulation and normals
- Cone coordinates and normals based on params set by the user are calculated on the backend and then sent back to the client

## Env Variables
Create a .env file in the root and add the following
```
NODE_ENV = development
PORT = 5000
```

## Install Dependencies (frontend & backend)
```
npm install
cd frontend
npm install
```

## C++ module: install dependencies and build
```
cd backend/cpp_calc_triangulation
npm install
npm run compile
```

## Run frontend (:3000) & backend (:5000)
```
npm run dev
```
