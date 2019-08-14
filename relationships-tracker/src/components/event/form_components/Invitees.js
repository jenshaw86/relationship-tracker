import React from 'react';
import {Form} from 'react-bootstrap';

const Invitee = props => {
  const displayNames = () => {
    if(props.relationships && props.relationships.length !== 0) {
      return props.relationships.map(rel => {
        return (
          <option key={rel.id} value={rel.id}>{`${rel.first_name} ${rel.last_name}`}</option>
        )
      })
    }
  }

  return (
    <Form.Group>
      <Form.Label>Invite:</Form.Label>
      <Form.Control as="select" 
        value={props.inviteeId}
        onChange={ev => props.setInviteeId(ev.target.value)}>
        {displayNames()}
      </Form.Control>
    </Form.Group>
  )
}

export default Invitee

// TODO add autocomplete package to accurately fill name of relationships