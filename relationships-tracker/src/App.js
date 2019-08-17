import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard'

// import { Button } from 'react-bootstrap'
import Navbar from './components/Navbar'
// import Home from './containers/Home'
import Account from './containers/Account'
// import Relationships from './containers/Relationships'
// import RelationshipProfile from './components/relationship/RelationshipProfile'
// import Events from './containers/Events'
import EventProfile from './components/event/EventProfile'
// import EventCard from './components/event/EventCard'
// import Logout from './components/Logout'

// import {filterFutureEvents} from './utils'

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [relationships, setRelationships] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventView, setEventView] = useState({});
  // user handlers

  // relationship handlers
  // const handleNewRelationship = person => setRelationships([...relationships, person]);

  // event handlers
  const handleNewEvent = event => setEvents([...events, event]);

  // On login, fetch user data
  useEffect(() => {
    fetch(`http://localhost:3000/users/1`) //TODO: specify user on login
    .then(res => res.json())
    .then(user => {
      setCurrentUser(user)
      console.log('fetched user data')
      fetch(`http://localhost:3000/users/1/relationships`)
      .then(res => res.json())
      .then(user_rels => {
        console.log('fetched all relationships')
        setRelationships(user_rels)
        fetch(`http://localhost:3000/users/1/events`)
        .then(res => res.json())
        .then(user_events => {
          console.log('fetched all events')
          setEvents(user_events)
          console.log("fetches complete")
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
      
      <Route path ="/" exact 
      render={() => <Account user={currentUser} /> } />

      

      <Route path="/events"
        render={ () => <Dashboard events={events} relationships={relationships} setEvents={setEvents} 
        handleNewEvent={handleNewEvent}
        viewEvent={viewEvent}
      /> } />

      <Route path="/events/:name"
        render={ () => <EventProfile event={eventView} />}
      />
          
    </div>
  )
}

export default App;