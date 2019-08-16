import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteEvent = props => {
  
  const handleDelete = () => {
    fetch(`http://localhost:3000/relationship_events/${props.event.relationship_events[0].id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      fetch(`http://localhost:3000/events/${props.event.id}`, {
          method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => props.setEvents(data))
    })
  }

  return (
    <Button onClick={handleDelete}>Cancel Event</Button>
  )

}

export default DeleteEvent;