import React, { useState, useEffect } from 'react'
import { Form, Button, ButtonToolbar, Modal } from "react-bootstrap";
import { showDate } from '../../utils'
import EventSubmitButton from './EventSubmitButton'
import EventName from './form_components/EventName';
import Invitees from './form_components/Invitees';
import Location from './form_components/Location';
import StartDateTime from './form_components/StartDateTime'
import EndDateTime from './form_components/EndDateTime'
import Description from './form_components/Description';

// TODO: DEBUG THIS. can't read property id of undefined 16
const EventForm = props => {
  const [eventName, setEventName] = useState(props.event ? props.event.name : '');
  const [location, setLocation] = useState(props.event ? props.event.location : '');
  const [description, setDescription] = useState(props.event ? props.event.description : '');
  const [startDate, setStartDate] = useState(props.event ? showDate(props.event.start_date) : new Date());
  const [endDate, setEndDate] = useState(props.event ? showDate(props.event.end_date) : startDate);
  // const [inviteeId, setInviteeId] = useState(props.relationship ? props.event.relationships[0].id : props.relationship.id) 
  
  // the purpose of someFunction, for now, is to determine what the contents of props are to therefore help determine whether to autofill the invited party state and section of the form
  const somefunction = props => {
    debugger;
    // if props contains an event, this is an edit form. return the id of the associated connection.
    if (props.event || props.relationship) {
      debugger;
      return props.relationship.id;
    } else if (props.relationship) { // if props contains a relationship, we're creating a new event through a connection, return the connection's id
      debugger;
      return props.relationship.id
    } else { // if props doesn't contain either of the above, this is a new event creation. Return the first connection as a default
      debugger;
      return props.relationships[0].id
    }
  }
  // const [inviteeId, setInviteeId] = useState(props.event || props.relationship ? props.relationship.id : props.relationships[0].id)
  const [inviteeId, setInviteeId] = useState(props.event || props.relationship ? props.relationship.id : props.relationships[0].id)

  useEffect((endDate) => {
    if(endDate < startDate) {
      setEndDate(startDate)
    }
  }, [startDate])
// Did it break? check this argument.

  return (
    <Form>
      <Modal.Body>
        {/* Event Name */}
        <EventName eventName={eventName} setEventName={setEventName} />
        {/* Invitee Name */}
        <Invitees inviteeId={inviteeId} setInviteeId={setInviteeId} 
        // relationships={props.relationships} 
        {...props}
        // relationships={props.relEventData.relationships} 
        />
        {/* Location */}
        <Location location={location} setLocation={setLocation} />
        {/* Start Date, Time */}
        <StartDateTime startDate={startDate} setStartDate={setStartDate} />
        {/* End Date, Time */}
        <EndDateTime endDate={endDate} setEndDate={setEndDate} startDate={startDate} />
        {/* Description */}
        <Description description={description} setDescription={setDescription}/>
        {/* Send Notification? */}
        {/* <Form.Check label="Send friend notifications about this event?"/>  */}
      </Modal.Body>

      <Modal.Footer>
        {/* Close, Confirm Buttons */}
        <ButtonToolbar>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <EventSubmitButton 
            {...props} 
            inviteeId={inviteeId} 
            eventName={eventName} 
            startDate={startDate} 
            endDate={endDate} 
            location={location} 
            description={description} 
          />
        </ButtonToolbar>
      </Modal.Footer>
    </Form>
  )
}

export default EventForm;