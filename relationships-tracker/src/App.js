import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
// import { Button } from 'react-bootstrap'
import Navbar from './components/Navbar'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Relationships from './containers/Relationships'
import RelationshipProfile from './components/relationship/RelationshipProfile'
import Events from './containers/Events'
import EventProfile from './components/event/EventProfile'
// import EventCard from './components/event/EventCard'
import Logout from './components/Logout'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [relationships, setRelationships] = useState([]);
  const [events, setEvents] = useState([])

  // relationship handlers
  const handleNewRelationship = person => setRelationships([...relationships, person]);
  const handleRemoveRelationship = data => setRelationships(data);

  // event handlers
  const handleNewEvent = event => setEvents([...events, event]);
  const handleCancelEvent = data => setEvents(data);

  // On login, fetch user data
  useEffect(() => {
    fetch(`http://localhost:3000/users/1`) //TODO: specify user on login
    .then(res => res.json())
    .then(data=> {
      setCurrentUser(data);
      setRelationships(data.relationships);
      setEvents(data.events);
    })
  }, [])
  
  // Render Navbar
  // Routes
  return (
    <>
      <Router>
        <Navbar />
        <Route path="/" exact 
          render={props => < Home 
            {...props} /> } />
        <Route path="/profile" 
          render={props => < Profile 
            {...props} 
            user={currentUser} /> } />
        <Route path="/relationships" exact 
          render={props => < Relationships 
            {...props} 
            relationships={relationships} 
            handleNewRelationship={handleNewRelationship} 
            handleRemoveRelationship={handleRemoveRelationship} /> } />
        <Route path="/relationships/:id" 
          render={props => <RelationshipProfile 
            {...props} /> } /> 
        <Route path="/events" exact 
          render={props => < Events 
            {...props} 
            events={events} 
            handleNewEvent={handleNewEvent} 
            handleCancelEvent={handleCancelEvent} /> } />
        <Route path="/events/:id" 
          render={props => <EventProfile 
            {...props} /> } />
        <Route path="/logout" 
          render={ () => < Logout /> } />
      </Router>
    </>
  );
}

export default App;
