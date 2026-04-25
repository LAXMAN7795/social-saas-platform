# 🚀 Social SaaS Platform

A full-stack AI-powered social media management platform that allows users to create, optimize, schedule, and publish posts across multiple platforms.

---

## 🌐 Live Demo

* 🔗 Frontend: https://social-saas-platform.pages.dev/
* 🔗 Backend API: https://social-saas-platform.onrender.com/
* 🎥 Demo Video: https://drive.google.com/file/d/1-0U2yXlccqw44rJtgtNlbrA2otMq6zyF/view?usp=sharing

---

## ✨ Features

* 📝 Create and manage social media posts
* 🤖 AI-powered content generation (captions, hashtags, optimization)
* 🖼 Media upload and selection
* 📅 Schedule posts
* 📊 Activity logs & status tracking
* 📡 Real-time publishing (Telegram integration)
* 🌍 Fully deployed (Frontend + Backend)

---

## 🏗️ Architecture

```
Frontend (React + Vite, Cloudflare Pages)
        ↓
Backend (FastAPI, Render)
        ↓
Database (SQLite / PostgreSQL)
        ↓
External APIs:
   • Telegram Bot API
   • Groq AI API
```

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router

### Backend

* FastAPI
* SQLAlchemy
* Uvicorn

### Integrations

* Telegram Bot API (real-time posting)
* Groq API (AI content generation)

### Deployment

* Cloudflare Pages (Frontend)
* Render (Backend)

---

## 🧪 Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/LAXMAN7795/social-saas-platform.git
cd social-saas-platform
```

---

### 2️⃣ Backend Setup

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (.env)

```
GROQ_API_KEY=your_groq_api_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

---

## 📡 Platform Initialization

Run once to add platforms:

```
https://social-saas-platform.onrender.com/posts/init-platforms
```

---

## 🔌 Integration Design

### Telegram Integration (Implemented)

* Uses Telegram Bot API
* Sends message using:

```
https://api.telegram.org/bot<TOKEN>/sendMessage
```

* Real-time publishing when post is created/scheduled

---

### AI Integration (Groq API)

Used for:

* Caption generation
* Hashtag generation
* Content optimization
* Engagement prediction

---

## ➕ How to Add New Platforms

1. Create a new adapter function:

```
def publish_new_platform(content):
    # API call logic
```

2. Register in platform registry:

```
platform_registry = {
    "Telegram": publish_telegram,
    "NewPlatform": publish_new_platform
}
```

3. Add platform in database:

```
/posts/init-platforms
```

4. Update frontend to display platform

---

## 📂 Project Structure

```
social-saas-platform/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api.js
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│
└── README.md
```

---

## 📊 API Endpoints

| Endpoint              | Description          |
| --------------------- | -------------------- |
| /posts/               | Create post          |
| /posts/logs           | View logs            |
| /media/upload         | Upload media         |
| /media/               | Get media            |
| /posts/platforms      | Get platforms        |
| /posts/init-platforms | Initialize platforms |

---

## ☁️ Deployment

### Frontend

* Cloudflare Pages
* Build: `npm run build`
* Output: `dist`

### Backend

* Render (FastAPI service)

---

## 🧠 Key Highlights

* Modular architecture for easy platform integration
* Real-time API-based publishing
* AI-assisted content generation
* Scalable backend design
* Fully deployed production-ready system

---

## 🎯 Future Improvements

* Add LinkedIn & Instagram real APIs
* Calendar view for scheduling
* Multi-user authentication
* Analytics dashboard

---

## 👨‍💻 Author

**Laxman Gouda**

---

## ⭐ Final Note

This project demonstrates a real-world SaaS architecture with live deployment, API integrations, and scalable design.
