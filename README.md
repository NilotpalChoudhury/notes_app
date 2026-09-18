# Notes App (MERN Stack)

A full-stack notes app I built using MongoDB, Express, React (Vite), and Node.js.

## Candidate Details
- **Name:** Nilotpal Choudhury
- **Student ID:** 2026202005
- **GitHub Repository:** https://github.com/NilotpalChoudhury/notes_app 

## Tech Stack
- **Frontend:** React (Vite) + Axios
- **Backend:** Node.js + Express
- **Database:** MongoDB

## Project Structure
```
notes-app/
├── server/       # Express + MongoDB backend
└── client/       # Vite + React frontend
```

## Prerequisites
- Node.js (v18+)
- A MongoDB database — either:
  - A local MongoDB instance on `mongodb://localhost:27017`
  - MongoDB Atlas 
    (
    used here — since MongoDB won't install/run on ubuntu 26.04
    If you are using MongoDB Atlas, then `server/.env` should have your connection string

    ```
    MONGODB_URI= your url
    PORT=5000
    ```
    )

## Setup & Run

### Backend
```bash
cd server
npm install
```

Then:


```bash
npm start
```
You should see `MongoDB connected successfully!` and `Server running on http://localhost:5000`.

### Frontend
In a second terminal:
```bash
cd client
npm install
npm run dev
```
Runs on **http://localhost:5173**.

## API Endpoints
| Method | Endpoint         | Description                            |
|--------|------------------|-----------------------------------------|
| POST   | `/api/notes`     | Create a new note → `201 Created`      |
| GET    | `/api/notes`     | Get all notes, sorted newest first     |
| DELETE | `/api/notes/:id` | Delete a note by ID → `200 OK` / `404` |

Tested all three with Postman before hooking up the frontend.
