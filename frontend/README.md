This project implements a Directed Acyclic Graph (DAG)-based form builder UI using React, TypeScript, Vite, and React Flow.

It fetches blueprint graph data from a mock backend server and allows users to map fields from upstream forms to prefill downstream forms.

Tech Stack
React 18

TypeScript

Vite

React Flow

Material-UI (MUI)

Node.js (mock backend server)

🛠 How to run the project locally
1. Clone the repository
bash

git clone(https://github.com/BatsaIke/avantusTest)
cd avantusTest

2. Install dependencies
bash
npm install
3. Start the backend mock server
The backend server serves the graph.json file at a REST API endpoint.


cd server # navigate to where your backend server is
npm install
npm start
This will start tje server

bash


http://localhost:3000/api/v1/123/actions/blueprints/bp_456/bp_v_123/graph

4. Start the frontend (Vite React app)
bash

cd frontend # navigate to your frontend
npm run dev
This will run your frontend on:

bash

http://localhost:5173/