import React, { useReducer } from 'react';
import {filterFutureEvents, filterPastEvents} from '../utils';
import Events from './Events';
import AddEventButton from '../components/event/AddEventButton'
import EventToggler from '../components/event/EventToggler'

// props: 
// events

const Dashboard = props => {
  const upcomingEvents = filterFutureEvents(props.events); 
  const pastEvents = filterPastEvents(props.events);
  
  const initialState = {display: upcomingEvents};

  function reducer(state, action) {
    switch (action.type) {
      case 'past':
        return {display: pastEvents};
      case 'upcoming':
        return initialState;
      default:
        throw new Error();
    }
  }
  
  function DisplayEvents() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleClick = (type) => dispatch({type});

    if (state.display) {
      return (
        <div>
          <EventToggler handleClick={handleClick}/>
          <AddEventButton 
          handleNewEvent={props.handleNewEvent} 
          relationships={props.relationships} />
          <Events events={state.display} setEvents={props.setEvents} relationships={props.relationships} viewEvent={props.viewEvent} />
        </div>
      )
    } else {
      return (
        <div>
          <EventToggler handleClick={handleClick} />
          <AddEventButton 
          handleNewEvent={props.handleNewEvent} 
          relationships={props.relationships} />
          <Events events={upcomingEvents} setEvents={props.setEvents} relationships={props.relationships} viewEvent={props.viewEvent}/>
        </div>
      )
    }
  }
  
  return DisplayEvents();
}

export default Dashboard;