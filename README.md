# 💬 ChitChat - Real-time Messaging App

A modern, full-stack real-time chat application built with the MERN stack, featuring Google OAuth authentication, image sharing, and a beautiful dark-themed UI.

![ChitChat](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-v18+-green)

## ✨ Features

### 🔐 Authentication
- **Google OAuth 2.0** - Secure, one-click authentication
- **JWT Tokens** - Secure session management
- **Protected Routes** - Client and server-side route protection

### 💬 Real-time Messaging
- **Instant Messaging** - Real-time chat powered by Socket.io
- **Online Status** - See who's online in real-time
- **Message History** - Persistent message storage in MongoDB
- **Typing Indicators** - Know when someone is typing

### 📸 Media Sharing
- **Image Upload** - Share images in chat (max 5MB)
- **Cloudinary Integration** - Fast, reliable image hosting with CDN
- **Image Preview** - Preview images before sending
- **Profile Pictures** - Custom profile picture upload

### 🎨 User Experience
- **Dark Theme** - Modern, eye-friendly dark UI
- **Emoji Picker** - 16 popular emojis to express yourself
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Smooth Animations** - Polished transitions and interactions
- **Toast Notifications** - Real-time feedback for user actions

### ⚙️ Settings & Customization
- **Update Profile Picture** - Upload custom profile pictures
- **Change Display Name** - Update your username anytime
- **User Sidebar** - Quick access to all conversations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for secure authentication
- **Cloudinary** - Cloud-based image management

### DevOps & Tools
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart server on changes
- **ESLint** - Code linting and formatting
- **Git** - Version control

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) or local installation
- **Git** - [Download](https://git-scm.com/)

You'll also need accounts for:
- **Google Cloud Console** - For OAuth credentials
- **Cloudinary** - For image hosting (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/avinash23em/chat.git
cd chat-app
```

### 2. Install Dependencies

Install dependencies for root, backend, and frontend:

```bash
npm run install-all
```

Or install manually:

```bash
# Install root dependencies (concurrently)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret (generate a random string)
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `https://yourdomain.com/api/auth/google/callback` (for production)
7. Copy **Client ID** and **Client Secret** to your `.env` file

### 5. Configure MongoDB

**Option A: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string to `MONGODB_URI` in `.env`
5. Replace `<password>` with your database password

**Option B: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/chatapp
```

### 6. Configure Cloudinary

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy **Cloud Name**, **API Key**, and **API Secret**
4. Add to your `.env` file

### 7. Run the Application

From the root directory:

```bash
npm run dev
```

This will start:
- **Backend** on `http://localhost:5000`
- **Frontend** on `http://localhost:5173`

Or run separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 8. Open in Browser

Navigate to `http://localhost:5173` and sign in with Google!

## 📁 Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth & error handling
│   │   ├── lib/              # Utilities (socket, cloudinary)
│   │   └── index.js          # Server entry point
│   ├── .env                  # Environment variables (not in git)
│   ├── .env.example          # Environment template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── store/            # Zustand state management
│   │   ├── lib/              # Utilities (axios)
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static assets
│   ├── index.html
│   ├── tailwind.config.js    # TailwindCSS config
│   └── package.json
├── .gitignore
├── package.json              # Root package (concurrently)
└── README.md
```

## 🔧 Available Scripts

### Root Directory

```bash
npm run dev          # Run both frontend and backend
npm run server       # Run backend only
npm run client       # Run frontend only
npm run install-all  # Install all dependencies
```

### Backend

```bash
npm run dev          # Start backend with nodemon
npm start            # Start backend (production)
```

### Frontend

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🌐 API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check auth status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/message/users` - Get all users
- `GET /api/message/:id` - Get messages with user
- `POST /api/message/send/:id` - Send message to user

## 🎨 UI Components

- **Navbar** - Navigation with profile and logout
- **Sidebar** - User list with online status
- **ChatContainer** - Message display and input
- **NoChatSelected** - Welcome screen
- **SettingsPage** - Profile customization
- **AuthPage** - Google OAuth login
- **LandingPage** - Marketing page with features

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **HTTP-only Cookies** - Prevent XSS attacks
- **Environment Variables** - Sensitive data protection
- **CORS Configuration** - Controlled API access
- **Input Validation** - Prevent malicious data
- **File Size Limits** - Prevent large uploads (5MB max)
- **Google OAuth** - No password storage needed


## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- Check network access in MongoDB Atlas

### Google OAuth Error
- Verify redirect URIs in Google Console
- Check `CLIENT_URL` in backend `.env`
- Ensure cookies are enabled in browser

### Images Not Uploading
- Verify Cloudinary credentials
- Check file size (max 5MB)
- Check network connection

### Socket.io Connection Issues
- Ensure backend is running
- Check CORS configuration
- Verify `VITE_API_URL` in frontend

## 📝 Future Enhancements

- [ ] Group chat functionality
- [ ] Voice/video calling
- [ ] Message reactions
- [ ] File sharing (documents, videos)
- [ ] Message search
- [ ] User blocking
- [ ] Read receipts
- [ ] Message editing/deletion
- [ ] Dark/light theme toggle
- [ ] Push notifications
- [ ] Mobile app (React Native)


