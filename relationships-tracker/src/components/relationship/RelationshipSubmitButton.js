import React from 'react';
import {Button} from 'react-bootstrap';

const RelationshipSubmitButton = props => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleClose();
    let imageUrl = props.image
    if(props.image === '') {
      imageUrl = "https://www.thesun.co.uk/wp-content/uploads/2016/06/nintchdbpict000242868564.jpg"
    }
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
        image: imageUrl,
        email: props.email,
        phone_number: props.phone,
        contact_frequency: props.contact_frequency,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(newPerson => props.handleNewRelationship(newPerson))
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
        image: props.image,
        email: props.email,
        phone_number: props.phone,
        contact_frequency: props.contact_frequency,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(allRels => {
      props.updateRelationships(allRels)
      const editedRel = allRels.find(rel => rel.id === props.relationship.id)
      props.viewRelationship(editedRel)
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