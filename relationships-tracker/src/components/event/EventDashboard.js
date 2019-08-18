import React from 'react';
import {Button} from 'react-bootstrap'
import {Link, Route} from 'react-router-dom'
import {filterFutureEvents, filterPastEvents} from '../../utils';
import EventsList from './EventsList';
import AddEventButton from './AddEventButton';

const Dashboard = props => {
  const upcomingEvents = filterFutureEvents(props.events); 
  const pastEvents = filterPastEvents(props.events);

  return (
    <div>
      <Link to='/events/upcoming'><Button>Upcoming Events</Button></Link>
      <Link to='/events/past'><Button>Past Events</Button></Link>
      <AddEventButton handleNewEvent={props.handleNewEvent} setEvents={props.setEvents} relationships={props.relationships} setRelationships={props.setRelationships} />
      
      <Route path='/events/upcoming' exact render={ () => <EventsList events={upcomingEvents} relationships={props.relationships} setEvents={props.setEvents} path={'/events/upcoming'} viewEvent={props.viewEvent} /> } />
      <Route path='/events/past' exact render={ () => <EventsList events={pastEvents} path={'/events/past'} viewEvent={props.viewEvent} /> } />
    </div>
  )

}

export default Dashboard;