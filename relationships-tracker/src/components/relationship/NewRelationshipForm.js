import React, {useState} from 'react'
import {Form, Button, ButtonToolbar, Modal} from "react-bootstrap";
// Form Components
import FirstName from '../form/FirstName';
import LastName from '../form/LastName';
import RelationshipType from './form_components/RelationshipType';
import Phone from '../form/Phone';
import Email from '../form/Email'
import ContactFrequency from './form_components/ContactFrequency'

const NewRelationshipForm = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relType, setRelType] = useState("Friend");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentInterval, setCurrentInterval] = useState(7);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleClose();
    fetch(`http://localhost:3000/relationships`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        relationship_type: relType,
        image: "https://www.thesun.co.uk/wp-content/uploads/2016/06/nintchdbpict000242868564.jpg",
        email: email,
        phone_number: phone,
        contact_frequency: currentInterval,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(obj => props.handleNewRelationship(obj))
  }

  return (
    
    <Form>
      <Modal.Body>
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
        <ContactFrequency currentInterval={currentInterval} setCurrentInterval={setCurrentInterval} />
      </Modal.Body>

      <Modal.Footer>
        {/* Close, Submit Buttons */}
        <ButtonToolbar>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={(event) => handleSubmit(event)}>
            Submit
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Form>
  )
}

export default NewRelationshipForm