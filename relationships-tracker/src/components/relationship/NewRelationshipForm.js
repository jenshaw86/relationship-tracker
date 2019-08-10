import React, {useState} from 'react'
import {Form} from "react-bootstrap";

import FirstName from './form_components/FirstName';
import LastName from './form_components/LastName';
import RelationshipType from './form_components/RelationshipType';
import Phone from './form_components/Phone';
import Email from './form_components/Email'
import ContactFrequency from './form_components/ContactFrequency'
// import ContactMeasure from './form_components/ContactMeasure'

const NewRelationshipForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relType, setRelType] = useState("Friend");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentInterval, setCurrentInterval] = useState(1);
  // const [measure, setMeasure] = useState("days")

  return (
    <Form>
      {/* First, Last Name */}
      <Form.Row>
        <FirstName firstName={firstName} setFirstName={setFirstName} />
        <LastName lastName={lastName} setLastName={setLastName} />
      </Form.Row>

      {/* Relationship Type, Email, Phone */}
      <RelationshipType relType={relType} setRelType={setRelType} />
      <Email email={email} setEmail={setEmail} />
      <Phone phone={phone} setPhone={setPhone} />
      
      {/* Notification Frequency */}
      <Form.Row>
        <ContactFrequency currentInterval={currentInterval} setCurrentInterval={setCurrentInterval} />
        {/* <ContactMeasure measure={measure} setMeasure={setMeasure} /> */}
      </Form.Row>
      
      <Form.Group>
        <Form.Check type="checkbox" label="Send me reminders to connect" />
      </Form.Group>

      {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
    </Form>
  )
}

export default NewRelationshipForm