import React from 'react';
import EventCard from './EventCard';

const EventsList = props => {

  const displayAllEvents = () => {
    if (props.events && props.events.length !== 0 ) {
      return props.events.map(event => {
        return <EventCard 
          key={event.id} 
          event={event}
          viewEvent={props.viewEvent}
          {...props}
          />
      })
    }
  }

  const displayHeader = () => {
    if (props.match.url === "/events/past") {
      return <h3>Past Events</h3>
    } else {
      return <h3>Upcoming Events</h3>
    }
  }

  return (
    <div className="events-list">
      {displayHeader()}
      { displayAllEvents() }
    </div> 
  )
}

export default EventsList