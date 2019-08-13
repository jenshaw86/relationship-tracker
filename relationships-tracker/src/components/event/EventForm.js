import React, {useState} from 'react'
import {Form, Button, ButtonToolbar, Modal} from "react-bootstrap";
import {showDate} from '../../utils'

import EventName from './form_components/EventName';
import Invitees from './form_components/Invitees';
import Location from './form_components/Location';
import StartDateTime from './form_components/StartDateTime'
import EndDateTime from './form_components/EndDateTime'
import Description from './form_components/Description';

// PROPS : 
// functions setEvents() OR handleNewEvent()

const EventForm = props => {
  const [eventName, setEventName] = useState(props.event ? props.event.name : '');
  const [invitees, setInvitees] = useState(props.event? props.event.relationships.map(r => `${r.first_name} ${r.last_name}`) : []);
  const [location, setLocation] = useState(props.event ? props.event.location : '');
  const [description, setDescription] = useState(props.event ? props.event.description : '');
  const [startDate, setStartDate] = useState(props.event ? showDate(props.event.start_date) : new Date());
  const [endDate, setEndDate] = useState(props.event ? showDate(props.event.end_date) : startDate);


  // POST new event and relationship_event
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
        end_date: endDate,
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

  // PATCH event
  const handleSubmitEdit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/events/${props.event.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: eventName,
        start_date: startDate,
        end_date: endDate,
        location: location,
        description: description,
        user_id: 1,
      })
    })
    .then(res => res.json())
    .then(obj => props.setEvents(obj))
    props.handleClose();
  }

  const displaySubmitButton = () => {
    if (props.handleNewEvent) {
      return <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)} >Create</Button>
    } else {
      return <Button variant="primary" type="submit" onClick={(e) => handleSubmitEdit(e)}>Edit</Button>
    }
  }

  return (
    <Form>
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
          {displaySubmitButton()}
        </ButtonToolbar>
      </Modal.Footer>
    </Form>
  )
}

export default EventForm;