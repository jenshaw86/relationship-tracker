import React from 'react'
import {Link, NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><NavLink to='/profile'>User Profile</NavLink></li>
            <li><NavLink to='/relationships'>Relationships</NavLink></li>
            <li><NavLink to='/events'>Events</NavLink></li>
            {/* <li><Link to='/logout'>Logout</Link></li> */}
          </ul>
        </nav>
    )
}

export default Navbar