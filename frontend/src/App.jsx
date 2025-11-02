import { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import './App.css'

import Navbar from "./components/navbar.jsx"
import Homepage from "./pages/homepage.jsx"
import LandingPage from "./pages/LandingPage.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import Settingspage from "./pages/settingspage.jsx"
import { useAuthstore } from "./store/useAuth.js"

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthstore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {authUser && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <LandingPage />} />
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <Settingspage /> : <Navigate to="/auth" />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}
export default App
