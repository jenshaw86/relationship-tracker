import React from 'react';
import {Button, Container} from 'react-bootstrap'
import {Link, Route} from 'react-router-dom'
import {filterFutureEvents, filterPastEvents} from '../../utils';
import EventsList from './EventsList';
import AddEventButton from './AddEventButton';

const EventDashboard = props => {

  const upcomingEvents = filterFutureEvents(props.events); 
  const pastEvents = filterPastEvents(props.events);
  return (
    <Container>
      <Link to={"/events/upcoming"}><Button>Upcoming Events</Button></Link>
      <Link to={"/events/past"}><Button>Past Events</Button></Link>
      <AddEventButton handleNewEvent={props.handleNewEvent} relationships={props.relationships} />
      
      <Route path={"/events/upcoming"} exact render={ (browserHistory) => <EventsList {...browserHistory} events={upcomingEvents} relationships={props.relationships} viewEvent={props.viewEvent} updateEvents={props.updateEvents} /> } />
      <Route path={"/events/past"} exact render={ (browserHistory) => <EventsList {...browserHistory} events={pastEvents} viewEvent={props.viewEvent} /> } />
    </Container>
  )

}

export default EventDashboard;