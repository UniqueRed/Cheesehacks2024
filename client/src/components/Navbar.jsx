import React from 'react'
import logo from '../assets/FlapLogo.png'

const Navbar = () => {
  return (
    <>
        <div class="navbar">
            <div class="navbar-right">
                <img id="logo" className="logo" src={logo} alt="" />
            </div>
            <div class="navbar-right">
                {/* <a href="#" class="navbar-link">About</a> */}
                {/* <a href="#" class="navbar-link">Settings</a> */}
            </div>
        </div>
    </>
  )
}

export default Navbar