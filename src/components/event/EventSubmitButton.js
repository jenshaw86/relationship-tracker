import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { newEvent, updateEvent } from '../../services/eventsApi';

const EventSubmitButton = props => { 
  // POST new event and relationship_event
  const handleSubmit = event => {
    event.preventDefault();
    props.handleClose();
    newEvent(props);
  }

  // PATCH event
  const handleSubmitEdit = event => {
    event.preventDefault();
    props.handleClose();
    updateEvent(props.event, props);
  }

  const displaySubmitButton = () => {
    return (props.handleNewEvent) ? <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)} >Create</Button> : <Button variant="primary" type="submit" onClick={(e) => handleSubmitEdit(e)}>Edit</Button>
  }
  
  return (
    <>
    <Link to="/events/upcoming">
      {displaySubmitButton()}
    </Link>
    </>
  )
}

export default EventSubmitButton;