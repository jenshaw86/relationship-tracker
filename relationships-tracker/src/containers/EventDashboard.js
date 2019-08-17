import React, { useReducer } from 'react';
import {Button } from 'react-bootstrap'
import {Link, Route} from 'react-router-dom'
import {filterFutureEvents, filterPastEvents} from '../utils';
import Events from './Events';

// props: 
// events

const Dashboard = props => {
  const upcomingEvents = filterFutureEvents(props.events); 
  const pastEvents = filterPastEvents(props.events);

  return (
    <div>
      <Link to='/events/upcoming'><Button>Upcoming Events</Button></Link>
      <Link to='/events/past'><Button>Past Events</Button></Link>
      <Route path='/events/upcoming' render={ () => <Events events={upcomingEvents} relationships={props.relationships} setEvents={props.setEvents} path={'/events/upcoming'} viewEvent={props.viewEvent} /> } />
      <Route path='/events/past' render={ () => <Events events={pastEvents} path={'/events/past'} viewEvent={props.viewEvent} /> } />

    </div>
  )

}

export default Dashboard;