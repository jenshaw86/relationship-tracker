import React, {useState} from 'react'
import {Form, Button, ButtonToolbar, Modal} from "react-bootstrap";

import EventName from './form_components/EventName';
import Invitees from './form_components/Invitees';
import Location from './form_components/Location';
import StartDateTime from './form_components/StartDateTime'
import EndDateTime from './form_components/EndDateTime'
import Description from './form_components/Description';

const NewEventForm = props => {
  const [eventName, setEventName] = useState('');
  const [invitees, setInvitees] = useState([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleClose();
    fetch(`http://localhost:3000/events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        name: eventName,
        start_date: startDate,
        endDate: endDate,
        location: location,
        description: description,
        user_id: 1,
      })
    })
    .then(res => res.json())
    .then(obj => {
      postRelEvent(obj);
      props.handleNewEvent(obj);
    })
  }

  const postRelEvent = (obj) => {
    fetch(`http://localhost:3000/relationship_events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        relationship_id: 1,
        event_id: obj.id
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <Form onSubmit={(ev) => handleSubmit(ev)}>
      <Modal.Body>
        {/* Event Name */}
        <EventName eventName={eventName} setEventName={setEventName} />
        {/* Invitee Name */}
        <Invitees invitees={invitees} setInvitees={setInvitees} />
        {/* Location */}
        <Location location={location} setLocation={setLocation} />
        {/* Start Date, Time */}
        <StartDateTime startDate={startDate} setStartDate={setStartDate} />
        {/* End Date, Time */}
        <EndDateTime endDate={endDate} setEndDate={setEndDate} startDate={startDate} />
        {/* Description */}
        <Description description={description} setDescription={setDescription}/>
      </Modal.Body>

      <Modal.Footer>
        {/* Close, Confirm Buttons */}
        <ButtonToolbar>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Form>
  )
}

export default NewEventForm;