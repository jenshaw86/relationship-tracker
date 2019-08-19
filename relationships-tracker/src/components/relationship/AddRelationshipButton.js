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
    <div>
      <Button onClick={() => handleShow()}>Add New Relationship</Button>
      <RelationshipModal show={show} handleClose={handleClose} handleNewRelationship={props.handleNewRelationship} />
    </div>
  )
}

export default AddRelationshipButton;