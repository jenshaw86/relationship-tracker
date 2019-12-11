import React from 'react'
import {NavLink} from 'react-router-dom';

// TODO: check if token is available, and if so, render the home page with the following links
      // Home, Account, Connections, Events
// TODO: if token isn't available, render home page with the following links
      // Home, Login, Signup

const ROOT_PATH = `/stay-connected`

const Navbar = props => {
  if (!localStorage.getItem('token')) {
    return (
      <nav>
        <NavLink className="nav-link" to={ROOT_PATH}>Home</NavLink>
        <NavLink className="nav-link" to={`${ROOT_PATH}/login`}>Login</NavLink>
        <NavLink className="nav-link" to={`${ROOT_PATH}/signup`}>Sign Up</NavLink>
      </nav>
    )
  } else {
    return (
      <nav>
        <NavLink className="nav-link" to={ROOT_PATH}>Home</NavLink>
        <NavLink className="nav-link" to={`${ROOT_PATH}/account`}>Account</NavLink>
        <NavLink className="nav-link" to={`${ROOT_PATH}/relationships`}>Connections</NavLink>
        <NavLink className="nav-link" to={`${ROOT_PATH}/events/upcoming`}>Events</NavLink>
        <NavLink 
          to="/login"
          className="nav-link" 
          onClick={() => {
            props.handleLogout();
          }
        }>Logout</NavLink>
        
      </nav>
      )
  }
}

export default Navbar