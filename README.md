# Full Stack Application – React + Express

This repository contains a full stack application with:

- **Frontend**: React (in `frontend/`)
- **Backend**: Express.js (in `backend/`)

The frontend and backend are organized into their own directories and run independently during development.

---

## 📁 Project Structure

HOMEO_QUIZZ/  
├── frontend/ # React frontend  
│ ├── public/  
│ ├── src/  
│ └── package.json  
├── backend/ # Express backend  
│ ├── app.js  
│ ├── package.json  
│ └── project_homeo.sql  
├── .gitignore  
└── README.md # This file  


---

## 🚀 Getting Started

### 🔧 Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+ recommended)
- **npm** (comes with Node.js)
- **Relational Database** (import sql file in backend folder)

Clone the repository

git clone <repo-url>  
cd <repo-folder>  
---

## 🖥️ Running the Project Locally

You need to run both the frontend and backend servers separately.

---

### 🔹 Backend (Express)

cd frontend  
npm install  
npm start  

## By default, React runs on http://localhost:3000.

### 🔹 Backend (Express)

cd backend  
npm install  
npm start  

## By default, the Express server runs on http://localhost:5000
## Make sure to create database using the .sql file in backend folder
  
  
📦 Build Frontend for Production  
To create a production-ready React build:
  
cd frontend  
npm run build  
Then you can serve it using a static server or integrate it with the Express app.
  
  
✅ Deployment Tips  
For production deployment:  
  
Serve frontend build statically via Express or a CDN.  
  
Use process managers like PM2 to keep backend running.  
  
  
🙌 Author
Frontend Developer - @sharanbingewar  
Backend Developer - @pranay-sompalli  
Coordinator, Integration and Deployment - @S-Rajasekhar-Reddy  
Feel free to fork, contribute, or report issues!  
