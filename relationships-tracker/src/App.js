import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard'

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

import {filterFutureEvents} from './utils'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [relationships, setRelationships] = useState([]);
  const [events, setEvents] = useState([])
  // user handlers

  // relationship handlers
  const handleNewRelationship = person => setRelationships([...relationships, person]);

  // event handlers
  const handleNewEvent = event => setEvents([...events, event]);

  // On login, fetch user data
  useEffect(() => {
    fetch(`http://localhost:3000/users/1`) //TODO: specify user on login
    .then(res => res.json())
    .then(user => {
      setCurrentUser(user)
      fetch(`http://localhost:3000/relationships`)
      .then(res => res.json())
      .then(data => {
        const user_relationships = data.filter(rel => rel.user_id === 1) // Filter relationships whose user_ids match user 1
        setRelationships(user_relationships)
        fetch(`http://localhost:3000/events`)
        .then(res => res.json())
        .then(data => {
          const user_events = data.filter(ev => ev.user_id === 1) // Filter events whose user_ids match user 1
          setEvents(user_events)
        })
      })
    })
  }, [])
  
  return (
    <>
        <Navbar />
        
        <Route path="/" exact
          render={ () => <Dashboard events={events} setEvents={setEvents} handleNewEvent={handleNewEvent} />}
        />
{/*         
        <Route path="/upcoming_events" 
          render={ () => <Events /> }
        /> */}

        {/* <Route path="/account" exact
          render={() => <Account />}
        />
        <Route path="/relationships" exact
          render={() => <Relationships />}
        /> */}


        {/* <Route path="/" exact 
          render={props => < Home 
            {...props} /> } />
        <Route path="/profile" 
          render={props => < Profile
            {...props}  
            user={currentUser} 
            events={events}
            setCurrentUser={setCurrentUser} 
            handleNewEvent={handleNewEvent} 
            setEvents={setEvents} /> } />
        <Route path="/relationships" exact 
          render={props => < Relationships 
            {...props} 
            relationships={relationships} 
            handleNewRelationship={handleNewRelationship} 
            setRelationships={setRelationships} /> } />
        <Route path="/relationships/:id" 
          render={props => <RelationshipProfile 
            {...props} setRelationships={setRelationships} /> } /> 
        <Route path="/events" exact 
          render={props => <>
                <h3>All Events</h3>
                < Events 
                  {...props} 
                  events={filterFutureEvents(events)} 
                  setEvents={setEvents}
                  handleNewEvent={handleNewEvent} />
              </> 
          } />
        <Route path="/events/:id" 
          render={props => <EventProfile 
            {...props} /> } />
        <Route path="/logout" 
          render={ () => < Logout /> } /> */}
    </>
  );
}

export default App;