import React from 'react'
import {Button, Modal} from "react-bootstrap";
import NewRelationshipForm from './NewRelationshipForm'

const RelationshipModal = (props) => {
  
  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>New Relationship to Track</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewRelationshipForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => props.handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RelationshipModal