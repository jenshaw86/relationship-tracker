import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css'; 
import Home from './containers/Home'
import Profile from './containers/Profile'
import Relationships from './containers/Relationships'
import Events from './containers/Events'
import Logout from './components/Logout'

function App() {
  return (
    <div className="App">
      <h1>You can do this!</h1>
      <Router>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/profile'>User Profile</Link>
          </li>
          <li>
            <Link to='/relationships'>Relationships</Link>
          </li>
          <li>
            <Link to='/events'>Events</Link>
          </li>
          <li>
            <Link to='/logout'>Logout</Link>
          </li>
        </ul>
        <Route exact path="/" component={Home}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/relationships" component={Relationships}></Route>
        <Route path="/events" component={Events}></Route>
        <Route path="/logout" component={Logout}></Route>
      </Router>
    </div>
  );
}

export default App;
