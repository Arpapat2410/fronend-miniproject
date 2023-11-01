import { Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import EditPage from './pages/EditPage'
import SiginPage from './pages/SiginPage'
import SignupPage from "./pages/SignupPage"
import NavBar from "./components/NavBar"
import Categories from './components/Categories'
import React, { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {

  return (
    <div>
      <NavBar/>
      
      <div className="container mx-auto h-full">
        <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/edit/:id" element={<EditPage />}></Route>
        <Route path ="Signin" element={<SiginPage />}  />
        <Route path ="Signup" element={<SignupPage />}  />
      </Routes>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App;