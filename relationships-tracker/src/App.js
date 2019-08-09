import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Relationships from './containers/Relationships'
import RelationshipProfile from './components/RelationshipProfile'
import Events from './containers/Events'
import Logout from './components/Logout'

const App = () => {
    
  return (
    <>
      <h1>You can do this!</h1>
      <Router>
        <Navbar />
        <Route exact path="/" render={ (props) => < Home {...props} /> } />
        <Route path="/profile" render={ (props) => < Profile {...props} /> } />
        <Route exact path="/relationships" render={ (props) => < Relationships {...props} /> } />
        <Route path="/relationships/:id" render={ (props) => <RelationshipProfile {...props} /> } />
        <Route path="/events" render={ (props) => < Events {...props} /> } />
        <Route path="/logout" render={ () => < Logout /> } />
      </Router>
    </>
  );
}

export default App;
