import React, {useState, useEffect} from 'react'
import {Form, Button, ButtonToolbar, Modal} from "react-bootstrap";
import {showDate} from '../../utils'
import EventSubmitButton from './EventSubmitButton'
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
  // const [invitees, setInvitees] = useState(props.event ? `${props.event.relationships[0].first_name} + ${props.event.relationships[0].last_name}` : "");
  const [location, setLocation] = useState(props.event ? props.event.location : '');
  const [description, setDescription] = useState(props.event ? props.event.description : '');
  const [startDate, setStartDate] = useState(props.event ? showDate(props.event.start_date) : new Date());
  const [endDate, setEndDate] = useState(props.event ? showDate(props.event.end_date) : startDate);
  const [inviteeId, setInviteeId] = useState(props.event ? props.event.relationships[0].id : 0)

  return (
    <Form>
      <Modal.Body>
        {/* Event Name */}
        <EventName eventName={eventName} setEventName={setEventName} />
        {/* Invitee Name */}
        <Invitees inviteeId={inviteeId} setInviteeId={setInviteeId} relationships={props.relationships} />
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
          <EventSubmitButton {...props} inviteeId={inviteeId} eventName={eventName} startDate={startDate} endDate={endDate} location={location} description={description} />
        </ButtonToolbar>
      </Modal.Footer>
    </Form>
  )
}

export default EventForm;