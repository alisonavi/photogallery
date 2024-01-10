import React from 'react'
import { auth, provider } from '../db/DataBase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const handgeGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
    navigate('/home');
  }
  return (
    <div className='login'>
      <div className='loginCenter'>
        <span className='name'>
          <a href="https://github.com/alisonavi" className='tag'> @alisonavi </a>
          {"'s photogallery"}
        </span>
        <br />
        <span className='logInAcessWords'> Login for access to the website with your google account </span>
        <button className='logInWithGoogle' onClick={handgeGoogleLogin}> Login with Google </button>
      </div>
    </div>
  )
}

export default Login

// const handgeGoogleLogin = async () => {
//   const result = await signInWithPopup(auth, provider);
//   navigate('/home');
// }