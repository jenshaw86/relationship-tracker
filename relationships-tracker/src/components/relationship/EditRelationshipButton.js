import React, {useState} from 'react';
import {Button} from 'react-bootstrap'
import RelationshipModal from './RelationshipModal'

const EditRelationshipButton = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button onClick={() => handleShow()} >Edit Relationship</Button>
      <RelationshipModal show={show} handleClose={handleClose} relationship={props.relationship} 
      viewRelationship={props.viewRelationship}
      updateRelationships={props.updateRelationships}
      />
    </div>
  )
}

export default EditRelationshipButton