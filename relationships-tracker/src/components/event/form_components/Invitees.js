import React from 'react';
import {Form} from 'react-bootstrap';

const Invitee = props => {
  
  const displayNames = () => {
    if(props.relationships && props.relationships.length !== 0) {
      return props.relationships.map(relationship => {
        return (
          <option key={relationship.id} value={relationship.id}>{`${relationship.first_name} ${relationship.last_name}`}</option>
        )
      })
    }
  }

  return (
    <Form.Group>
      <Form.Label>Invite:</Form.Label>
      <Form.Control as="select" 
        value={props.inviteeId}
        onChange={ev => {
          console.log(ev.target.value)
          props.setInviteeId(ev.target.value)
        }}
        >
        {displayNames()}
      </Form.Control>
    </Form.Group>
  )
}

export default Invitee;