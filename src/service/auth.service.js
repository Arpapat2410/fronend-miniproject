import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = URL + "/api/auth/"


const login =  async (username, password) =>{
    const response = await axios.post(API_URL + "signin",{username,password});
    if (response.data.accessToken) {
        //sign in successfully
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
    }
    return response.data;
};

const register = async (username,email,password) => {
    return await axios.post(API_URL + "signup", {username,email,password})
}

//ใช้สำหรับดึงข้อมูลผู้ใช้ปัจจุบันจาก Local Storage ของเว็บบราวเซอร์
const getCurrentUser = () => { // เรียกใช้เมธอด getItem ของ localStorage เพื่อดึงข้อมูลที่เก็บใน Local Storage ภายใต้ key "user"
    return JSON.parse(localStorage.getItem("user")); //เพื่อแปลงสตริง JSON ที่ได้จาก localStorage เป็นอ็อบเจ็กต์ JavaScript
};

const logout = () => { 
    localStorage.removeItem("user"); //ใช้ removeItem ของ localStorage เพื่อลบข้อมูลที่เก็บใน Local Storage ภายใต้ key "user"
    localStorage.removeItem("token"); //ใช้ removeItem เพื่อลบข้อมูลที่เก็บใน Local Storage ภายใต้ key "token"
}
const authService = {
    login,
    register,
    getCurrentUser,
    logout
}

export default authService;

