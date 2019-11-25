import React, { useState, useEffect } from 'react'
import {Modal, Form, Button, ButtonToolbar} from "react-bootstrap";
import {updateUser} from './../../services/usersApi'
import FirstName from '../form/FirstName'
import LastName from '../form/LastName';
import Email from '../form/Email';
import Phone from '../form/Phone';
import Image from '../form/Image';

const ProfileModal = props => {
  const [firstName, setFirstName] = useState(props.user.first_name)
  const [lastName, setLastName] = useState(props.user.last_name)
  const [email, setEmail] = useState(props.user.email)
  const [phone, setPhone] = useState(props.user.phone_number)
  const [image, setImage] = useState(props.user.image)

  // TODO: finish setting state below
  useEffect(() => {
    setFirstName(props.user.first_name)
    setLastName(props.user.last_name)
    setEmail(props.user.email)
    setPhone(props.user.phone_number)
    setImage(props.user.image)
  }, [props.user] )

  const handleEdit = () => {
    props.handleClose();
    let formData = {
      firstName: firstName, 
      last_name: lastName, 
      email: email,
      phone: phone,
      image: image
    }
    updateUser(props, formData)
  }

  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        {/* Edit Profile Main Body */}
        <Form>
          <Modal.Body>
            <Form.Row>
              <FirstName firstName={firstName} setFirstName={setFirstName} />
              <LastName lastName={lastName} setLastName={setLastName} />
            </Form.Row>
            <Email email={email} setEmail={setEmail} />
            <Phone phone={phone} setPhone={setPhone} />
            <Image image={image} setImage={setImage} />
          </Modal.Body>
        </Form>
        <Modal.Footer>
        {/* Close, Submit Buttons */}
        <ButtonToolbar>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => handleEdit()}>
            Edit
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProfileModal