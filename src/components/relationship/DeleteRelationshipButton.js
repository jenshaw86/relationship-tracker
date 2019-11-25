import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteRelationship } from '../../services/relationshipsApi';

const DeleteRelationshipButton = props => {
  
  const handleOnClick = () => deleteRelationship(props);

  return (
    <>
      <Button className="rel-delete-btn" size="sm" onClick={() => handleOnClick()}>Remove</Button>
    </>
  )
}

export default DeleteRelationshipButton;