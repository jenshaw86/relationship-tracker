import React from 'react';
import {Link} from 'react-router-dom';
import {displayDate} from '../../utils'
import EditEventButton from './EditEventButton'
import DeleteEventButton from './DeleteEventButton'

const EventCard = (props) => {
  const displayButtons = () => {
    if (props.relationships) {
    return (
        <>
          <EditEventButton event={props.event} updateEvents={props.updateEvents} relationships={props.relationships} /> 
          <DeleteEventButton event={props.event} updateEvents={props.updateEvents} />
        </>
      )
    } 
  }

  return(
    <>
      <Link to={"/event/${props.event.name}"} onClick={() => props.viewEvent(props.event)}  >
        <div>
          <h4>{displayDate(props.event.start_date)}</h4>
          <h4>{props.event.name}</h4>
        </div>
      </Link>
      {displayButtons()} {/* Edit and Delete Buttons */}
    </>
  )
}

export default EventCard
