import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from "react-bootstrap";


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
    .then(obj => 
      {
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
    .then((data) => {
      refreshState(obj)
    })
  }

  // PATCH event
  const handleSubmitEdit = event => {
    event.preventDefault();
    props.handleClose();
    let prevInvitee = props.event.relationships[0].id
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

      patchRelEvent(obj, prevInvitee)
    })
  }

  const patchRelEvent = (obj, prevInvitee) => {
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
    .then(() => {
      fetch(`http://localhost:3000/relationships/${prevInvitee}`)
      .then(res => res.json())
      .then(prev => {
        props.updateRelationships(prev)
      })

      refreshState(obj)
    })
  }

  // Replace Event State
  const refreshState = (eventObj) => {
    // if there's a new obj, then fetch obj and add to event state
    if(props.handleNewEvent) { //creating a new even
      fetch(`http://localhost:3000/events/${eventObj.id}`)
      .then(res => res.json())
      .then(obj => {
        props.handleNewEvent(obj)
        fetch(`http://localhost:3000/relationships/${obj.relationships[0].id}`)
        .then(res => res.json())
        .then(rel => {
          // props.viewRelationship(rel) //update the view
          // update the relationship in all relatinoships
          props.updateRelationships(rel)
          props.viewRelationship(rel)
        })
      })
    } else { // editing an old event
      props.updateEvents(eventObj); //Come back here after app
      fetch(`http://localhost:3000/relationships/${eventObj.relationships[0].id}`)
      .then(res => res.json())
      .then(rel => {
        props.viewRelationship(rel)
        // map through existing relationships
        // replace this instance with updated one

      })

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