import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css'; 
import Home from './containers/Home'
import Profile from './containers/Profile'
import Relationships from './containers/Relationships'
import Events from './containers/Events'
import Logout from './components/Logout'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/users/1')
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data
      })
    })
  }

  render() {
    return (
      <>
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
          <Route exact path="/" render={ () => < Home first_name={this.state.user.first_name} /> } />
          <Route path="/profile" render={ () => < Profile /> } />
          <Route path="/relationships" render={ () => < Relationships relationships={this.state.user.relationships} /> } />
          <Route path="/events" render={ () => < Events /> } />
          <Route path="/logout" render={ () => < Logout /> } />
        </Router>
      </>
    );
  }
}

export default App;
