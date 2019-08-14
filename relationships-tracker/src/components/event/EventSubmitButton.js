import React from 'react';
import {Form, Button, ButtonToolbar, Modal} from "react-bootstrap";


const EventSubmitButton = props => {
  // POST new event and relationship_event
  const handleSubmit = event => {
    event.preventDefault();    
    props.handleClose();
    fetch(`http://localhost:3000/events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        name: props.eventName,
        start_date: props.startDate,
        end_date: props.endDate,
        location: props.location,
        description: props.description,
        user_id: 1,
      })
    })
    .then(res => res.json())
    .then(obj => {
      postRelEvent(obj);
    })
  }

  const postRelEvent = (obj) => {
    fetch(`http://localhost:3000/relationship_events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        relationship_id: props.inviteeId,
        event_id: obj.id
      })
    })
    .then(res => res.json())
    .then(() => {
      refreshEvent(obj)
    })
  }

  const refreshEvent = obj => {
    fetch(`http://localhost:3000/events/${obj.id}`)
    .then(res => res.json())
    .then(data => props.handleNewEvent(data))
  }

  // PATCH event
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/events/${props.event.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: props.eventName,
        start_date: props.startDate,
        end_date: props.endDate,
        location: props.location,
        description: props.description,
        user_id: 1,
      })
    })
    .then(res => res.json())
    .then(obj => props.setEvents(obj))
    props.handleClose();
  }

  const displaySubmitButton = () => {
    if (props.handleNewEvent) {
      return <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)} >Create</Button>
    } else {
      return <Button variant="primary" type="submit" onClick={(e) => handleSubmitEdit(e)}>Edit</Button>
    }
  }

  return (
    <>
    {displaySubmitButton()}
    </>
  )
}

export default EventSubmitButton;