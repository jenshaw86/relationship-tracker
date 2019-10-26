import React from 'react'
import { Modal } from "react-bootstrap";
import RelationshipForm from './RelationshipForm'

const RelationshipModal = props => {

  const formType = () => props.handleNewRelationship ? "New Relationship" : "Edit Relationship";

  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{formType()}</Modal.Title>
        </Modal.Header>
        
        <RelationshipForm handleClose={props.handleClose} {...props} />
      </Modal>
    </>
  )
}

export default RelationshipModal;