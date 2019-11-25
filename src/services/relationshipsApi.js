import { API_ROOT, auth_headers} from './api';

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

// getRelationships fetches authorized user's relationships and sets app's relationships state
export const getRelationships = (token, handleSetState) => {
  return (
    fetch(`${API_ROOT}/relationships`, auth_headers(token))
    .then(res => res.json())
    .then(data => {
      handleSetState(data)
    })
  )
}

// newRelationship posts authorized user's new relationship, then adds new relationship existing list in state
export const newRelationship = props => {
  let token = localStorage.getItem('token');
  fetch(`${API_ROOT}/relationships`, relConfigObj('POST', token, props))
  .then(res => res.json())
  .then(newPerson => props.handleNewRelationship(newPerson))
}

// updateRelationship patches authorized user's existing relationship, and replaces existing instance in state
export const updateRelationship = props => {
  let token = localStorage.getItem('token');
  fetch(`${API_ROOT}/relationships/${props.relationship.id}`, relConfigObj('PATCH', token, props))
  .then(res => res.json())
  .then(rel => {
    props.updateRelationships(rel)
    props.viewRelationship(rel)
  })
}

export const deleteRelationship = props => {
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