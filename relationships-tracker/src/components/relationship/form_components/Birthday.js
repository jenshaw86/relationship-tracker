import React from 'react'
import {Form} from "react-bootstrap";

import DatePicker from 'react-datepicker'
import 'react-datepicker/dis/react-datepicker.css'

const Birthdate = (props) => {
  return (
    <Form.Group>
      <Form.Label>Birthdate</Form.Label>
      <DatePicker
        selected={props.birthdate}
        onChange={setBirthdate}
      />
  </Form.Group>
  )
}

export default Birthdate;