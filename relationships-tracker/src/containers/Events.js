import React from 'react';
import EventCard from '../components/event/EventCard';

// PROPS: setEvents(), events

const Events = props => {

  // Show all Event Cards
  const displayAllEvents = () => {
    if (props.events && props.events.length !== 0 ) {
      return props.events.map(obj => {
        return <EventCard 
          key={obj.event.id} 
          event={obj}
          setEvents={props.setEvents}
          relationships={props.relationships}
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