import React from 'react'
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
          {/* <NavLink className="nav-link" to='/'>StayConnected</NavLink> */}
          <NavLink className="nav-link" to='/'>Home</NavLink>
          <NavLink className="nav-link" to='/account'>Account</NavLink>
          <NavLink className="nav-link" to='/relationships'>Connections</NavLink>
          <NavLink className="nav-link" to='/events/upcoming'>Events</NavLink>
        </nav>
    )
}

export default Navbar