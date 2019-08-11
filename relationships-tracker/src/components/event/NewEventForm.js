import React, {useState} from 'react'
import {Form, Button, ButtonToolbar, Modal} from "react-bootstrap";

import EventName from './form_components/EventName';
import Invitee from './form_components/Invitee';
import Location from './form_components/Location';
import Description from './form_components/Description';


const NewEventForm = props => {
  const [eventName, setEventName] = useState('');
  const [invitee, setInvitee] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.handleClose();
  //   fetch(`http://localhost:3000/relationships`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }, 
  //     body: JSON.stringify({
  //       first_name: firstName,
  //       last_name: lastName,
  //       relationship_type: relType,
  //       email: email,
  //       phone: phone,
  //       contact_frequency: currentInterval,
  //       user_id: 1
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(obj => props.handleNewRelationship(obj))
  // }

  return (
    <Form>
      <Modal.Body>
        {/* Event Name */}
        <EventName eventName={eventName} setEventName={setEventName} />
        {/* Invitee Name */}
        <Invitee invitee={invitee} setInvitee={setInvitee} />
        {/* Location */}
        <Location location={location} setLocation={setLocation} />
        {/* Start Date, Time */}
        
        {/* End Date, Time */}

        {/* Description */}
        <Description description={description} setDescription={setDescription}/>
      </Modal.Body>

      <Modal.Footer>
        {/* Close, Confirm Buttons */}
        <ButtonToolbar>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Form>
  )
}

export default NewEventForm;