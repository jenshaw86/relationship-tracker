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
      <Link to={`${props.match.url}/upcoming`}><Button>Upcoming Events</Button></Link>
      <Link to={`${props.match.url}/past`}><Button>Past Events</Button></Link>
      <AddEventButton handleNewEvent={props.handleNewEvent} relationships={props.relationships} />
      
      <Route path={`${props.match.url}/upcoming`} exact render={ (browserHistory) => <EventsList {...browserHistory} events={upcomingEvents} relationships={props.relationships} viewEvent={props.viewEvent} updateEvents={props.updateEvents} /> } />
      <Route path={`${props.match.url}/past`} exact render={ (browserHistory) => <EventsList {...browserHistory} events={pastEvents} viewEvent={props.viewEvent} /> } />
    </Container>
  )

}

export default EventDashboard;