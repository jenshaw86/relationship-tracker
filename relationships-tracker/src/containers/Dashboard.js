import React, { useReducer } from 'react';
import {filterFutureEvents, filterPastEvents} from '../utils';
import Events from './Events';

// props: 
// events

const Dashboard = props => {
  const upcomingEvents = filterFutureEvents(props.events);
  const pastEvents = filterPastEvents(props.events);
  
  const initialDisplay = {display: upcomingEvents};

  function reducer(state, action) {
    switch (action.type) {
      case 'past':
        return {display: pastEvents};
      case 'all':
        return {display: props.events};
      case 'upcoming':
        return initialDisplay;
      default:
        throw new Error();
    }
  }
  
  function DisplayEvents() {
    const [state, dispatch] = useReducer(reducer, initialDisplay);
    return (
      <div>
        <p>
          <span onClick={ () => dispatch({type: 'past'}) } >Past</span> |
          <span onClick={ () => dispatch({type: 'all'}) } >All</span> |
          <span onClick={ () => dispatch({type: 'upcoming'}) } >Upcoming</span>
        </p>
        <Events events={state.display} />
      </div>
    )
  }
  
  return DisplayEvents();
}

export default Dashboard;