import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuthContext();

  return (

    <div className="card w-96 bg-base-100 shadow-lg mx-auto  rounded mt-8">
      <figure className="px-10 pt-10">
        <img width={140} src="../../football-players.png" alt="Profile" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl text-accent-focus mb-2">{user.username}</h2>
        <p className='text-secondary'>ID : {user.id}</p>
        <p className='text-secondary'>Email : {user.email}</p>
        <p className='text-secondary'>ROLES :  {user.roles.length}</p>
        <div className='text-secondary paragraph'>
          {user.roles &&
            user.roles.map((role, index) =>
              <div key={index}>{role}</div>)}
        </div>

        <div className="text-muted mb-3 text-secondary"> Token :
          {user.accessToken.substring(0, 10)}...
          {user.accessToken.substring(user.accessToken.length - 20)}
        </div>
        <div className="card-actions">
          <Link to="/" className="btn btn-secondary w-full mt-2">Close</Link>
        </div>
      </div>
    </div>

  )
}

export default ProfilePage