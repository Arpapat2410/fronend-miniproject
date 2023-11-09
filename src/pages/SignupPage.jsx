import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import authService from '../service/auth.service.js';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate();
  const [_error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ message: "" })
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (user.confirmPassword == user.password) {
        const register = await authService.register(
          user.username,
          user.email,
          user.password
        )
        toast.success("Successfully registered!", {
          theme: "colored"
      })
        navigate("/signin")
      } else {
        setError(true)
        setErrorMessage({ message: "Failed! Password mismatched !" })

      }
    } catch (error) {
      console.error(error);
      setError(true)
      // console.log(error.response.data);
      // setErrorMessage(error.response.data)
    }
  }

  const handleClear = (e) => {
    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    })
    setError(false);
  }

  return (
    <div className='container mx-auto mt-16 w-[60%]'>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className='w-80'><img src="https://f.ptcdn.info/651/080/000/ruwal215n70e1EBtvcae6-s.jpg" alt="Album" /></figure>

        <div className="card-body">
          <span className="text-3xl text-center mb-5">Register to FOOTBALLSHOP</span>

          <input
              type="text"
              placeholder="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="input input-info w-full"
            />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input input-info w-full"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input input-info w-full"
            value={user.password}
            onChange={handleChange}
          />
          <input
              type="password"
              name="confirmPassword"
              placeholder='password'
              value={user.confirmPassword}
              onChange={handleChange}
              className="input input-info w-full"
            />
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleClear}>Cancel</button>
            <button className="btn btn-info" onClick={handleClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
