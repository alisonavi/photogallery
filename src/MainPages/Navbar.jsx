import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../db/DataBase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth'

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    navigate("/")
  }
  return (
    <div className="navbar">
      {!user && (
        <>
          <Link to="/" className='aboutUsLink'> About us </Link>
          <Link to="/login" className='loginLink'> Login </Link>
        </>
      )}
      <div className='pictureAndImage'>
        {user && (
          <>
            <Link to='/home' className='homeLink'> Home </Link>
            <Link to="/profile" className='profileLink'> My profile </Link>
            <p className='userName'> {user?.displayName}</p>
            <img className="profilePicture" src={user?.photoURL || ""} width="35" height="35" />
            <button className='signOutButton' onClick={signUserOut}> Sign out </button>
          </>
        )}
      </div>
    </div>
  )
}
export default Navbar