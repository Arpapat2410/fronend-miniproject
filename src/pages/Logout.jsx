import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom"
import authService from '../service/auth.service'

const Logout = () => {
    const navigate = useNavigate();
    // เรียกใช้งานฟังก์ชัน logout จาก authService
    const handleLogout = () => {
        authService.logout;
        navigate("/");
    }
    // จัดการการออกจากระบบหลังจากโหลด component เสร็จสิ้น
    setTimeout(()=>{
        handleLogout();
        
    },3 * 1000);
    
    
  return 
    <div>Logout</div>
  
}

export default Logout