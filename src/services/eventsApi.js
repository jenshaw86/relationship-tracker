import { API_ROOT, auth_headers } from './api';

const evConfigObj = (method, token, props) => {
  return(
    {
      method: `${method}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      }, 
      body: JSON.stringify({
        name: props.eventName,
        start_date: props.startDate,
        end_date: props.endDate,
        location: props.location,
        description: props.description,
        user_id: props.userId
      })
    }
  )
}

const relEvConfigObj = (method, token, props) => {
  return(
    {
      method: `${method}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      }, 
      body: JSON.stringify({
        event_id: props.event.id,
        relationship_id: props.inviteeId
      })
    }
  )
}

// getEvents fetches all of authorized user's events and sets app's events state
export const getEvents = (token, handleSetState) => {
  return (
    fetch(`${API_ROOT}/events`, auth_headers(token))
    .then(res => res.json())
    .then(data => {
      handleSetState(data)
    })
  )
}

// first, new event is created by authorized user
export const newEvent = props => {
  let token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/events`, evConfigObj('POST', token, props))
  .then(res => res.json())
  .then(newEv => {

    newRelEvent(newEv, token, props)
  })
}

// next, relationshipEvent is created
const newRelEvent = (event, token, props) => {
  return fetch(`${API_ROOT}/relationship_events`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
    body: JSON.stringify({
      relationship_id: props.inviteeId,
      event_id: event.id
    })
  })
  .then(res => res.json())
  .then(data => {
    // Todo: return data that contains the relationship and event objects, and directly handle refresh state with those objects already delivered 
    refreshStateAfterPost(data.event_id, token, props)
  })
}

// after event and relationshipEvent creation, fetch event (because it has a relationship_id now)
// handle new event in App.js
const refreshStateAfterPost = (eventId, token, props) => {
  return fetch(`${API_ROOT}/events/${eventId}`, auth_headers(token))
    .then(res => res.json())
    .then(newEvent => {

      props.handleNewEvent(newEvent);
      getRelationship(newEvent.relationships[0].id, token, props);
    })
}

// update relationship so that relationship reflects event addition
const getRelationship = (relationshipId, token, props) => {
  return fetch(`${API_ROOT}/relationships/${relationshipId}`, auth_headers(token))
  .then(res => res.json())
  .then(relationship => {
    props.updateRelationships(relationship);
    props.viewRelationship(relationship);
  })
}

export const updateEvent = (event, props) => {
  let token = localStorage.getItem('token');
  let newInvitee = event.relationships[0].id !== props.inviteeId

  return fetch(`${API_ROOT}/events/${event.id}`, evConfigObj('PATCH', token, props))
  .then(res => res.json())
  // consider if invitee form was changed. If there's a new invite, update relationship event.
  // else just update the events
  .then((updatedEvent) => {
    if(newInvitee) {
      console.log("new invite!")
      updateRelEvent(updatedEvent.relationship_events[0].id, token, event, props)
    } else {
      console.log("same old!")
      props.updateEvents(updatedEvent)
    }
  })
}

const updateRelEvent = (id, token, event, props) => {
  fetch(`${API_ROOT}/relationship_events/${id}`, relEvConfigObj('PATCH', token, props))
  .then(res => res.json())
  .then(data => {
    // get the updated event to update the list of events in state
    getEvent(data.event_id, token, props)
    // update the new and old invitee
    .then(getRelationship(data.relationship_id, token, props))
    .then(getRelationship(event.relationships[0].id, token, props))
  })
}

// Todo: this function is poorly worded. Should probably rename this to reflect its actual function
const getEvent = (eventId, token, props) => {
  console.log('getting event')
  return fetch(`${API_ROOT}/events/${eventId}`, auth_headers(token))
  .then(res => res.json())
  .then(event => {
    props.updateEvents(event)
  })
} 

export const deleteEvent = props => {
  let token = localStorage.getItem('token');
  fetch(`${API_ROOT}/events/${props.event.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(events => {
      props.handleDeletedEvent(events)
    })
}