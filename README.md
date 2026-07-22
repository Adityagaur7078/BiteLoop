<div align="center">

# 🍔 BiteLoop

### Discover • Like • Save • Explore Delicious Food Reels

A modern full-stack MERN application where users can discover short food reels, save their favorite dishes, and connect with local food partners through an engaging reel-based experience.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

# 📖 About

**BiteLoop** is a modern social food discovery platform inspired by short-form video applications.

Users can explore food reels uploaded by restaurants and food partners, like dishes they enjoy, save meals for later, and visit partner profiles to discover more delicious content.

Food partners can register, upload food reels, and showcase their menu through an interactive and responsive interface.

---

# ✨ Features

## 👤 User

- User Registration
- User Login
- Secure JWT Authentication
- Browse Food Reels
- Like Food
- Save Food
- View Personal Profile
- Logout

## 🍽 Food Partner

- Food Partner Registration
- Food Partner Login
- Upload Food Reels
- View Partner Profile

## 🎥 Food Reels

- Vertical Reel Feed
- Auto Video Playback
- Responsive Design
- Food Information
- Restaurant Information

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

## Cloud Storage

- ImageKit

---

# 📁 Project Structure

```text
BiteLoop
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Adityagaur7078/BiteLoop.git
```

Move into the project directory

```bash
cd BiteLoop
```

---

# 📦 Install Dependencies

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd ../frontend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

---

# ▶️ Run the Application

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

# 📌 Repository

```text
frontend/
backend/
README.md
```

---

# 👨‍💻 Author

**Aditya Gaur**

- GitHub: https://github.com/Adityagaur7078
- LinkedIn: https://www.linkedin.com/in/aditya-gaur-b484412bb

---

# ⭐ Support

If you like this project, please consider giving it a **⭐ Star** on GitHub.

Your support motivates me to build more open-source projects.

---

# 📄 License

This project is licensed under the **MIT License**.