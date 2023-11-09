import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import authService from '../service/auth.service.js'
import { useAuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'

const SignupPage = () => {
  const [user, setUser] = useState({
    //ต้องใช้ให้เหมือนกันหลังบ้าน
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [error, setError] = useState();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClear = (e) => {
    setUser({
      username: "",
      password: "",
    })
    setError(false);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await authService.login(user.username, user.password);
      login(currentUser)
      Swal.fire({
        title: "Login successful!",
        icon: "success"
      });
      navigate("/")
    } catch (error) {
      Swal.fire({
        title: "Unsuccessful login!",
        icon: "error"
      });
      console.log(error);
      setError(true);
    }
  }

  return (
    <div className='container mx-auto mt-16 w-[60%]'>
    <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className='w-80'><img src="https://s.isanook.com/sp/0/ui/292/1463171/liverpoolfc_345199050_1197991024242814_6763124454030903115_n.jpg" alt="Album" /></figure>
        
        <div className="card-body">
            <span className="text-3xl text-center mb-5">Login to FOOTBALLSHOP</span>
            <span className="text-sm text-center mb-3">Enter your username to log in as a member</span>
            <input
              type="text"
              placeholder="username"
              name="username"
              value={user.username}
              onChange={handleChange}  // เพิ่ม onChange เพื่ออัพเดตค่า user.username
              className="input input-warning  my-4 w-full"
            />
            <input
              type="password"
              name="password"
              placeholder='password'
              value={user.password}
              onChange={handleChange}  // เพิ่ม onChange เพื่ออัพเดตค่า user.password
              className="input input-warning  my-4 w-full"
            />
            <div className="card-actions justify-end">
              <button className="btn" onClick={handleClear}>Cancel</button>
              <button className="btn btn-warning" onClick={handleClick}>Sign In</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SignupPage;
