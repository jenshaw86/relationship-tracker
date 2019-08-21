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
      refreshStateAfterPost(obj)
    })
  }

  // PATCH event
  const handleSubmitEdit = event => {
    event.preventDefault();
    props.handleClose();
    let prevInviteeId = props.event.relationships[0].id // keep previous invitee id, use later to update relationships
    console.log('patch event')
    fetch(`http://localhost:3000/events/${props.event.id}`, { // patch event itself
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
    .then(ev => {  // newly updated event. WARNING: hasn't updated relationship
      patchRelEvent(ev, prevInviteeId) // move forward to patch relationship-event, take event
    })
  }

  const patchRelEvent = (ev, prevInviteeId) => { // patch relationship-event with new id first
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
    .then((re) => { // get back relationship
      fetch(`http://localhost:3000/relationships/${prevInviteeId}`) //update old relatinship next
      .then(res => res.json())
      .then(prev => {
        props.updateRelationships(prev)
      })
      refreshStateAfterPatch(re.event_id)
    })
  }

  // Replace Event State
  const refreshStateAfterPost = (eventObj) => {
    fetch(`http://localhost:3000/events/${eventObj.id}`)
      .then(res => res.json())
      .then(obj => {
        props.handleNewEvent(obj)
        fetch(`http://localhost:3000/relationships/${obj.relationships[0].id}`)
        .then(res => res.json())
        .then(rel => {
          props.updateRelationships(rel)
          props.viewRelationship(rel)
        })
      })
  }

  const refreshStateAfterPatch = id => {
    fetch(`http://localhost:3000/events/${id}`)
    .then(res => res.json())
    .then(ev => {
      props.updateEvents(ev)
      fetch(`http://localhost:3000/relationships/${ev.relationships[0].id}`)
      .then(res => res.json())
      .then(rel => {
        props.updateRelationships(rel)
        props.viewRelationship(rel)
      })
    })
  }
  // const refreshState = (eventObj) => {
  //   if(props.handleNewEvent) { //creating a new event
  //     fetch(`http://localhost:3000/events/${eventObj.id}`)
  //     .then(res => res.json())
  //     .then(obj => {
  //       props.handleNewEvent(obj)
  //       fetch(`http://localhost:3000/relationships/${obj.relationships[0].id}`)
  //       .then(res => res.json())
  //       .then(rel => {
  //         props.updateRelationships(rel)
  //         props.viewRelationship(rel)
  //       })
  //     })
    // } else { // editing an old event
    //   props.updateEvents(eventObj); 
    //   debugger;
    //   fetch(`http://localhost:3000/relationships/${eventObj.relationships[0].id}`)
    //   .then(res => res.json())
    //   .then(rel => {
    //     props.updateRelationships(rel)
    //     props.viewRelationship(rel)
    //   })

    // }
  // }


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