import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../service/auth.service';
import { useAuthContext } from '../context/AuthContext.jsx';
import Swal from 'sweetalert2'

function NavBar() {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        Swal.fire({
            title: "Successfully logged out!",
            icon: "success"
        });
        navigate("/");
    };

    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start ">
                <a href='/' className="btn btn-secondary normal-case text-xl mr-1.5">FOOTBALLSHOP</a>
            </div>

            <div className="navbar-end ">
                {user && (
                    <a href='/search' className="btn btn-success mr-2">Search</a>
                )}
                {user && user.roles.includes("ROLE_ADMIN") && (
                    <a href='/create' className="btn btn-accent mr-2">Create a Product</a>
                )}
                {!user && (
                    <a href='Signup' className="btn btn-info mr-1.5">Sigup</a>
                )}

                {!user && (
                    <a href='Signin' className="btn btn-warning mr-1.5">Sigin</a>
                )}
            </div>
            {user && (
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="../../football-players.png" />
                        </div>
                    </label>

                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a href='Profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={handleLogout} >Logout</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default NavBar