import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './containers/Home'
import Profile from './containers/Profile'
import Relationships from './containers/Relationships'
import RelationshipProfile from './components/relationship/RelationshipProfile'
import Events from './containers/Events'
import EventProfile from './components/EventProfile'
import Logout from './components/Logout'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [relationships, setRelationships] = useState([]);
  // const [relationshipView, setRelationshipView] = useState({});
  const [events, setEvents] = useState([])


  useEffect(() => {
    fetch(`http://localhost:3000/users/1`) //TODO: specify user on login
    .then(res => res.json())
    .then(data=> {
      setCurrentUser(data);
      setRelationships(data.relationships);
      setEvents(data.events);
    })
  }, [])
  
  const handleNewRelationship = person => setRelationships([...relationships, person]);
  
  return (
    <>
      <h1>You can do this!</h1>
      <Router>
        <Navbar />
        <Route exact path="/" render={ (props) => < Home {...props} /> } />
        <Route path="/profile" render={ (props) => < Profile {...props} user={currentUser} /> } />
        <Route exact path="/relationships" render={ (props) => < Relationships {...props} relationships={relationships} handleNewRelationship={handleNewRelationship} /> } />
        <Route path="/relationships/:id" render={ (props) => <RelationshipProfile {...props} /* relationship={relationshipView} */ /> } /> 
        <Route exact path="/events" render={ (props) => < Events {...props} events={events} /> } />
        <Route path="/events/:id" render={ (props) => <EventProfile {...props} /> } />
        <Route path="/logout" render={ () => < Logout /> } />
      </Router>
    </>
  );
}

export default App;
