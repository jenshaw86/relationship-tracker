import React from 'react';
import {Button} from 'react-bootstrap'

const DeleteRelationshipButton = props => {
  // handle delete relationship
  const handleOnClick = () => {
    fetch(`http://localhost:3000/relationships/${props.relationship.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => props.setRelationships(data))
  }  

  return (
    <Button onClick={handleOnClick}>Remove</Button>
  )
}

export default DeleteRelationshipButton;