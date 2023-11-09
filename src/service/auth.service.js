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

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}
const authService = {
    login,
    register,
    getCurrentUser,
    logout
}

export default authService;

