import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="navbar">
        <span className="logo">Chatly</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button className="btn"onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar