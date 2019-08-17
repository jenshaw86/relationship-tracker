import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from "react-bootstrap";


const EventSubmitButton = props => {
  // POST new event and relationship_event
  const handleSubmit = event => {
    event.preventDefault();
    console.log('submit new event')
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
    .then(obj => 
      {
        console.log(obj)
        postRelEvent(obj)
      })
  }

  const postRelEvent = (obj) => {
    console.log('submit new relevent')
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
    .then(() => refreshEvents(obj))
  }

  // PATCH event
  const handleSubmitEdit = event => {
    event.preventDefault();
    props.handleClose();
    console.log('patch event')
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
    .then(obj => {

      patchRelEvent(obj)
    })
  }

  const patchRelEvent = (obj) => {
    console.log('patch relevent')
    fetch(`http://localhost:3000/relationship_events/${props.event.relationship_events[0].id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        relationship_id: props.inviteeId,
        event_id: props.event.id
      })
    })
    .then(res => res.json())
    .then(() => refreshEvents(obj))
  }

  // Replace Event State
  const refreshEvents = obj => {
    // if there's a new obj, then fetch obj and add to event state
    if(props.handleNewEvent) {
      console.log('handle new event')
      fetch(`http://localhost:3000/events/${obj.id}`)
      .then(res => res.json())
      .then(obj => props.handleNewEvent(obj))
    } else {
      console.log('handle edited event')
      console.log(obj)
      props.setEvents(obj)
    }
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
    <Link to="/events/upcoming">
      {displaySubmitButton()}
    </Link>
    </>
  )
}

export default EventSubmitButton;