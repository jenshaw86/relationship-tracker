import React from 'react';
import { Button } from 'react-bootstrap';
import { api } from './../../services/api';

const DeleteRelationshipButton = props => {
  
  const handleOnClick = () => api.destroy.deleteRelationship(props);

  return (
    <>
      <Button className="rel-delete-btn" size="sm" onClick={() => handleOnClick()}>Remove</Button>
    </>
  )
}

export default DeleteRelationshipButton;