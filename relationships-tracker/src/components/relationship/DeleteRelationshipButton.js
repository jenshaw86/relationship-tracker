import React from 'react';
import {Button} from 'react-bootstrap'

// props 
// relationship={props.relationship} the relationship instance
// setRelationships={props.setRelationships} setState functions
// setEvents={props.setEvents}

const DeleteRelationshipButton = props => {
  // const events = props.relationship.events
  // const relationshipHasEvents = events.length !== 0;
  const rel_events = props.relationship.relationship_events;

  // I want to first delete any related events, then their relationship_events, and the finally the relationship itself

  const handleOnClick = () => deleteEvents();

  const deleteEvents = () => {
    // check if relationship has any events
    if (props.relationship.events.length !== 0) {
      // filter through all of user events, return only events  
      // whose relationship matches our instance 
      fetch(`http://localhost:3000/users/1/events`)
      .then(res => res.json())
      .then(events => {
        for (let i = 0; i < events.length; i++) {
          console.log(events[i].name)
          for(let j = 0; i < events[i].relationships.length; i++) {
            console.log(events[i].relationships[j].first_name)
            if (events[i].relationships[j].id === props.relationship.id) {
              console.log("found event")
              let eventId = events[i].id;
              if (events[i].relationships.length === 1) {
                console.log("delete event")
                fetch(`http://localhost:3000/events/${eventId}`, {
                  method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                  props.setEvents(data)
                  deleteRelEvent(eventId)
                })
              } else {
                console.log("delete join")
                deleteRelEvent(eventId)
              }
            } else {
              console.log("not a match")
            }
          }
        }
      })
    }
    deleteRelationship();
  }

  // delete relationship event
  const deleteRelEvent = (eventId) => {
    let target = rel_events.find(rel_event => rel_event.event_id === eventId)
    fetch(`http://localhost:3000/relationship_events/${target.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data.length))
  }
  
  // delete relationship instance
  const deleteRelationship = () => {
    fetch(`http://localhost:3000/relationships/${props.relationship.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => props.setRelationships(data))
  }
  

  return (
    <Button onClick={() => handleOnClick()}>Remove</Button>
  )
}

export default DeleteRelationshipButton;