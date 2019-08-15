import React from 'react';
import EventCard from '../components/event/EventCard';

// PROPS: setEvents(), events

const Events = props => {

  // Show all Event Cards
  const displayAllEvents = () => {
    if (props.events && props.events.length !== 0 ) {
      return props.events.map(event => {
        return <EventCard 
          key={event.id} 
          event={event}
          setEvents={props.setEvents}
          // handleEditEvent={props.handleEditEvent} 
          />
      })
    }
  }

  return (
    <div>
      { displayAllEvents() }
    </div> 
  )
}

export default Events