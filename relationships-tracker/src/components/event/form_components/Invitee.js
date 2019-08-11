import React from 'react';
import {Form} from 'react-bootstrap';

const Invitee = props => {
  return (
    <Form.Group>
      <Form.Label>Invite:</Form.Label>
      <Form.Control 
      type='text' 
      placeholder="Enter invitee's name"
      value={props.invitee}
      onChange={ev => props.setInvitee(ev.target.value)} />
    </Form.Group>
  )
}

export default Invitee