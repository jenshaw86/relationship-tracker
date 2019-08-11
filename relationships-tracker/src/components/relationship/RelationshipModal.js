import React from 'react'
import {Modal} from "react-bootstrap";
import NewRelationshipForm from './NewRelationshipForm'

const RelationshipModal = props => {
  
  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>New Relationship to Track</Modal.Title>
        </Modal.Header>
        
        <NewRelationshipForm handleClose={props.handleClose} handleNewRelationship={props.handleNewRelationship} />
      </Modal>
    </>
  )
}

export default RelationshipModal