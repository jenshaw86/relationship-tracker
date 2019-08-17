import React from 'react';
import {Button} from 'react-bootstrap';

const RelationshipSubmitButton = props => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleClose();
    fetch(`http://localhost:3000/relationships`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        first_name: props.firstName,
        last_name: props.lastName,
        relationship_type: props.relType,
        image: "https://www.thesun.co.uk/wp-content/uploads/2016/06/nintchdbpict000242868564.jpg",
        email: props.email,
        phone_number: props.phone,
        contact_frequency: props.contact_frequency,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(obj => props.handleNewRelationship(obj))
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    props.handleClose();
    fetch(`http://localhost:3000/relationships/${props.relationship.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        first_name: props.firstName,
        last_name: props.lastName,
        relationship_type: props.relType,
        image: "https://www.thesun.co.uk/wp-content/uploads/2016/06/nintchdbpict000242868564.jpg",
        email: props.email,
        phone_number: props.phone,
        contact_frequency: props.contact_frequency,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(obj => {
      props.setRelationships(obj)
      const editedRel = obj.find(rel => rel.id === props.relationship.id)
      props.setRelationshipView(editedRel)
    })
  }

  const displaySubmitButton = () => {
    if (props.handleNewRelationship) {
      return <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>Create</Button>
    } else {
      return <Button variant="primary" type="submit" onClick={(e) => handleSubmitEdit(e)}>Edit</Button>
    }

  }
  return(
    <div>
      {displaySubmitButton()}
      
    </div>
  )
}

export default RelationshipSubmitButton;