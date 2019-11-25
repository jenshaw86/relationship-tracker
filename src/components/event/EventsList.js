import React from 'react';
import EventCard from './EventCard';
import AddEventButton from './AddEventButton'

const EventsList = props => {

  const displayAllEvents = () => {
    debugger;
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
    if (props.match && props.match.url === "/events/past") {
      return <h3>Past Events</h3>
    } else if (props.match && props.match.url === "/events/upcoming") {
      return <h3>Upcoming Events</h3>
    } else {
      return (
      <div className="connection-events">
      <h3>Upcoming Events</h3>
      <AddEventButton updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship} relationship={props.relationship} handleNewEvent={props.handleNewEvent} relationships={props.relationships} />
      </div>
      )
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