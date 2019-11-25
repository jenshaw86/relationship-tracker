import React from 'react';
import { Button } from 'react-bootstrap';
import { api } from '../../services/api';
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