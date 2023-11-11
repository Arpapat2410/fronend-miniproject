import { Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import EditPage from './pages/EditPage'
import SiginPage from './pages/SiginPage'
import SignupPage from "./pages/SignupPage"
import SearchPage from './pages/SearchPage'
import ProtectedRoute from './pages/ProtectedRoute';
import NavBar from "./components/NavBar"
import Categories from './components/Categories'
import React, { useState } from 'react';
import ProfilePage from "./pages/ProfilePage"
import Logout from "./pages/Logout"
import AdminRoute from './pages/AdminRoute'
import { AuthProvider } from './context/AuthContext'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  return (
    //การใช้ Context API โดย AuthProvider เพื่อรวม state และ function ที่เกี่ยวข้องกับการตรวจสอบตัวตน
    <AuthProvider>
      <div>
        <NavBar />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/signin" element={<SiginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <ToastContainer />
      </div>
    </AuthProvider>
  )
}

export default App;