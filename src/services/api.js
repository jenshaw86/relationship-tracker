const API_ROOT = `http://localhost:3000/api/v1`;

const auth_headers = token => {
  return ({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  })
} 

const relConfigObj = (method, token, props) => {
  return(
    {
      method: `${method}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`

      }, 
      body: JSON.stringify({
        first_name: props.firstName,
        last_name: props.lastName,
        relationship_type: props.relType,
        image: props.image,
        email: props.email,
        phone_number: props.phone,
        contact_frequency: props.contact_frequency,
        user_id: props.userId
      })
    }
  )
}

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
        user_id: props.userId,
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

// Upon user signup, create a new user
export const signup = formData => {
  return (
    fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }, 
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
  )
}

// login creates a new authorization (POST), 
// returns json object constaining authorized user and jwt
const login = formData => {
  console.log("logging in")
  return (
    fetch(`${API_ROOT}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }, 
      body: JSON.stringify(formData)
    }) 
    .then(res => res.json())
  )
}

// getCurrentUser fetches (GET) the user that was authorized
// return json object containing user id and email
const getCurrentUser = token => {
  return (
    fetch(`${API_ROOT}/current_user`, auth_headers(token))
    .then(res => res.json())
  )
}

// getRelationships fetches authorized user's relationships and sets app's relationships state
const getRelationships = (token, handleSetState) => {
  return (
    fetch(`${API_ROOT}/relationships`, auth_headers(token))
    .then(res => res.json())
    .then(data => {
      handleSetState(data)
    })
  )
}

// newRelationship posts authorized user's new relationship, then adds new relationship existing list in state
const newRelationship = props => {
  let token = localStorage.getItem('token');
  fetch(`${API_ROOT}/relationships`, relConfigObj('POST', token, props))
  .then(res => res.json())
  .then(newPerson => props.handleNewRelationship(newPerson))
}

// updateRelationship patches authorized user's existing relationship, and replaces existing instance in state
const updateRelationship = props => {
  let token = localStorage.getItem('token');
  fetch(`${API_ROOT}/relationships/${props.relationship.id}`, relConfigObj('PATCH', token, props))
  .then(res => res.json())
  .then(rel => {
    props.updateRelationships(rel)
    props.viewRelationship(rel)
  })
}

const deleteRelationship = props => {
  let token = localStorage.getItem('token');
  fetch(`${API_ROOT}/relationships/${props.relationship.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(rels => {
      // props.updateRelationships(rels);
      props.handleDeletedRelationship(rels);
      // TODO fetch updated events and set to state
      // fetch(`http://localhost:3000/users/1/events`)
      // .then(res => res.json())
      // .then(events => props.updateEvents(events))
    })
}

// getEvents fetches all of authorized user's events and sets app's events state
const getEvents = (token, handleSetState) => {
  return (
    fetch(`${API_ROOT}/events`, auth_headers(token))
    .then(res => res.json())
    .then(data => handleSetState(data))
  )
}

// first, new event is created by authorized user
const newEvent = props => {
  let token = localStorage.getItem('token');
  return fetch(`${API_ROOT}/events`, evConfigObj('POST', token, props))
  .then(res => res.json())
  .then(newEv => newRelEvent(newEv, token, props))
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

const updateEvent = (event, props) => {
  let token = localStorage.getItem('token');
  let newInvitee = event.relationships[0].id !== props.inviteeId

  return fetch(`${API_ROOT}/events/${event.id}`, evConfigObj('PATCH', token, props))
  .then(res => res.json())
  // consider if invitee form was changed. If there's a new invite, update relationship event.
  // else just update the events
  .then((updatedEvent) => {
    if(newInvitee) {
      console.log("new invite!")
      debugger;
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
    debugger;
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

const deleteEvent = props => {
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

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  data: {
    getRelationships,
    getEvents
  }, 
  post: {
    newRelationship,
    newEvent
  },
  patch: {
    updateRelationship,
    updateEvent
  },
  destroy: {
    deleteRelationship,
    deleteEvent
  }
}