import React, {useState} from 'react';
import {Button} from 'react-bootstrap'
import RelationshipModal from './RelationshipModal'

const AddRelationshipButton = props => {
    // modal state
    const [show, setShow] = useState(false);
    // modal handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" className="new-btn" onClick={() => handleShow()}>New Connection</Button>
      <RelationshipModal show={show} handleClose={handleClose} handleNewRelationship={props.handleNewRelationship} />
    </>
  )
}

export default AddRelationshipButton;