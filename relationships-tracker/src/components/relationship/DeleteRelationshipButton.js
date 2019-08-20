import React from 'react';
import {Button} from 'react-bootstrap'

const DeleteRelationshipButton = props => {
  const handleOnClick = () => {
    fetch(`http://localhost:3000/relationships/${props.relationship.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(rels => {
      props.updateRelationships(rels)
      fetch(`http://localhost:3000/users/1/events`)
      .then(res => res.json())
      .then(events => props.updateEvents(events))
    })
  }  

  return (
    <Button onClick={() => handleOnClick()}>Remove</Button>
  )
}

export default DeleteRelationshipButton;