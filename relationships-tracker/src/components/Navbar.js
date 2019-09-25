import React from 'react'
import {NavLink} from 'react-router-dom';

const Navbar = props => {
    return (
        <nav>
          {/* <NavLink className="nav-link" to='/'>StayConnected</NavLink> */}
          <NavLink className="nav-link" to='/'>Home</NavLink>
          <NavLink className="nav-link" to='/account'>Account</NavLink>
          <NavLink className="nav-link" to='/relationships'>Connections</NavLink>
          <NavLink className="nav-link" to='/events/upcoming'>Events</NavLink>
          <NavLink className="nav-link" to='/signup'>Sign Up</NavLink>
          <NavLink className="nav-link" to='/login'>Login</NavLink>
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

export default Navbar