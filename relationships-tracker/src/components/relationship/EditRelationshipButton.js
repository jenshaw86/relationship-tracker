import React, {useState} from 'react';
import {Button} from 'react-bootstrap'
import RelationshipModal from './RelationshipModal'

const EditRelationshipButton = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="rel-edit-btn profile-edit-btn" size="sm" onClick={() => handleShow()} >Edit</Button>
      <RelationshipModal show={show} handleClose={handleClose} relationship={props.relationship} 
      viewRelationship={props.viewRelationship}
      updateRelationships={props.updateRelationships}
      />
    </>
  )
}

export default EditRelationshipButton