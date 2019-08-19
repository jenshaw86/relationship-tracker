import React from 'react'
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
          <NavLink className="nav-link" to='/'>Home</NavLink>
          <NavLink className="nav-link" to='/account'>Account</NavLink>
          <NavLink className="nav-link" to='/events/upcoming'>Events</NavLink>
          <NavLink className="nav-link" to='/relationships'>Relationships</NavLink>
        </nav>
    )
}

export default Navbar