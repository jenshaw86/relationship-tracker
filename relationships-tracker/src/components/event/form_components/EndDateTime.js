import React from 'react'
import {Form, Col} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from 'date-fns';

const EndDateTime = props => {


  return (
    <>
    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>End Date</Form.Label>
        <DatePicker 
          selected={props.endDate} 
          onChange={date => props.setEndDate(date)} 
          minDate={subDays(props.startDate, 0)}
          />
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>End Time</Form.Label>
        <DatePicker
          selected={props.endDate}
          onChange={time => props.setEndDate(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          dateFormat="h:mm aa"
          timeCaption="Time"
        />
      </Form.Group>
    </Form.Row>
        </>
  )
}

export default EndDateTime;