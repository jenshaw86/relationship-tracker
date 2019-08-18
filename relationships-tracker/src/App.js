import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import EventDashboard from './components/event/EventDashboard'
import EventProfile from './components/event/EventProfile'
// import Home from './containers/Home'
import Account from './containers/Account'
import RelationshipsList from './components/relationship/RelationshipsList'
import RelationshipProfile from './components/relationship/RelationshipProfile'
// import Logout from './components/Logout'

// import {filterFutureEvents} from './utils'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [relationships, setRelationships] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventView, setEventView] = useState({});
  const [relationshipView, setRelationshipView] = useState({})
  
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
      fetch(`http://localhost:3000/users/1/relationships`)
      .then(res => res.json())
      .then(user_rels => {
        setRelationships(user_rels)
        fetch(`http://localhost:3000/users/1/events`)
        .then(res => res.json())
        .then(user_events => {
          setEvents(user_events)
        })
      })
    })
  }, [])
  
  const viewEvent = (event) => {
    setEventView(event)
  }

  return (
    <div>
      <Navbar />

      <Route path='/account' exact render={ () => <Account user={currentUser} />} />
      
      {/* All and specific events */}
      <Route path="/events"
        render={ () => <EventDashboard events={events} relationships={relationships} setEvents={setEvents} handleNewEvent={handleNewEvent} viewEvent={viewEvent}
        setRelationships={setRelationships}
      /> } />
      <Route path='/events/:time/:name' render={ () => <EventProfile event={eventView} />} />

      {/* All relationships */}
      <Route path="/relationships" exact 
        render={() => <RelationshipsList 
          relationships={relationships} 
          handleNewRelationship={handleNewRelationship} 
          setRelationships={setRelationships} 
          setRelationshipView={setRelationshipView} 
          setEvents={setEvents} /> } 
      />
      <Route path="/relationships/:name" 
        render={ () => <RelationshipProfile 
          relationship={relationshipView} 
          setRelationships={setRelationships} 
          setRelationshipView={setRelationshipView} 
          viewEvent={viewEvent} /> } 
      />
    </div>
  )
}

export default App;