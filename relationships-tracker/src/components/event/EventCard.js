import React from 'react';
import {Link} from 'react-router-dom';
import {displayDay, displayMonth, displayDate, displayYear, displayTime} from '../../utils'
import EditEventButton from './EditEventButton'
import DeleteEventButton from './DeleteEventButton'

const EventCard = (props) => {
  const displayButtons = () => {
    if (props.relationships) {
    return (
        <>
          <EditEventButton event={props.event} updateEvents={props.updateEvents} relationships={props.relationships} updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship} /> 
          <DeleteEventButton event={props.event} updateEvents={props.updateEvents} />
        </>
      )
    } 
  }

  return(
    <div className="event-card">
      <span className="day">{displayDay(props.event.start_date)}</span>
      
      <div className="event-date">
        <span className="month">{displayMonth(props.event.start_date)}</span><br/>
        <span className="date">{displayDate(props.event.start_date)}</span><br/>
        <span className="year">{displayYear(props.event.start_date)}</span>
      </div>
      <div className="event-details">
          <Link to={"/event/${props.event.name"} onClick={() => props.viewEvent(props.event)} >
            <span className="event-name">{props.event.name}</span><br/>
          </Link>
          <span className="time">{displayTime(props.event.start_date)}</span><br/>
          <span className="location">{props.event.location}</span><br/>
          
          <span className="company">with {props.event.relationships[0].first_name} {props.event.relationships[0].last_name}</span>
      </div>
      {displayButtons()} {/* Edit and Delete Buttons */}
    </div>
  )
}

export default EventCard
