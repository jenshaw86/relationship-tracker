import React from 'react';
import {Button, ButtonGroup, Container, ButtonToolbar} from 'react-bootstrap'
import {Link, Route} from 'react-router-dom'
import {filterFutureEvents, filterPastEvents} from '../../utils';
import EventsList from './EventsList';
import AddEventButton from './AddEventButton';

const EventDashboard = props => {

  const upcomingEvents = filterFutureEvents(props.events); 
  const pastEvents = filterPastEvents(props.events);
  return (
    <Container className="events-container">
        <div className="header">
          <h2>Events</h2>
        </div>
        <div className="new-btn">
          <AddEventButton handleNewEvent={props.handleNewEvent} relationships={props.relationships} />
        </div>
        <div className="events-1">
          <Link to={"/events/past"}><Button className="event-btn past-btn">Past Events</Button></Link>
        </div>
        <div className="events-2">
          <Link to={"/events/upcoming"}><Button className="event-btn upcoming-btn">Upcoming Events</Button></Link>
        </div>
      
      <Route path={"/events/upcoming"} exact render={ (browserHistory) => <EventsList {...browserHistory} events={upcomingEvents} relationships={props.relationships} viewEvent={props.viewEvent} updateEvents={props.updateEvents} /> } />
      <Route path={"/events/past"} exact render={ (browserHistory) => <EventsList {...browserHistory} events={pastEvents} viewEvent={props.viewEvent} /> } />
    </Container>
  )

}

export default EventDashboard;