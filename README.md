**Personal Budget Tracker — Full Stack (React + Node.js)**

A simple, clean, and responsive Personal Budget Tracker application built using React (Frontend) and Node.js/Express (Backend) with JWT Authentication and in-memory storage (no database).

This project allows users to manage their income, expenses, categories, budget, and visualize financial data through charts.

**Features**
**Authentication**

JWT-based Login

Token saved in localStorage

Protected API routes

**Dashboard**

Total Income

Total Expenses

Balance

Income vs Expense Chart

Budget vs Spent Comparison Chart

**Transactions**

Add Income/Expense

Category-wise addition

Delete Transaction

Auto-update Dashboard

**Categories**

Add Category (with type: income/expense)

Delete Category

Auto-update everywhere

**Budget**

Set/Update Monthly Budget

Dashboard budget chart updates

**Fully Responsive**

Works on mobile, tablet, laptop

Sidebar collapses on small devices

**Project Structure**

Personal-Budget-Tracker/
│
├── frontend/          # React Vite App
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── charts/
│   │   └── App.jsx
│   └── package.json
│
└── backend/           # Node.js + Express
    ├── controllers/
    ├── routes/
    ├── data/
    ├── middlewares/
    ├── server.js
    └── package.json

**Tech Stack**
**Frontend**

React (Vite)

React Router

Recharts (Charts)

CSS (Responsive)

Fetch API

**Backend**

Node.js

Express.js

JWT (Authentication)

CORS

In-Memory Storage (No DB required)

**Setup Instructions**

**Clone the Repository**

git clone https://github.com/Prathm74/Personal-Budget-Tracker.git
cd Personal-Budget-Tracker

**Backend Setup**
cd backend
npm install
npm run dev

**Frontend Setup**
cd ../frontend
npm install
npm run dev

Default Login Credentials
email: test@example.com
password: 123456

**Deployment**
Frontend (Vercel)

Import repo

Set Root Directory → frontend

Build Command → npm run build

Output Directory → dist

**Backend (Render)**

New Web Service

Root Directory → backend

Start Command → node server.js

Add Environment Variable
