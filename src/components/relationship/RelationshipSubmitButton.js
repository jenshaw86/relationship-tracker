import React from 'react';
import { Button } from 'react-bootstrap';
import { newRelationship, updateRelationship } from '../../services/relationshipsApi';

const RelationshipSubmitButton = props => {
  
  const handleSubmit = event => {
    event.preventDefault();
    props.handleClose();
    // If user doesn't provide a url, use a default image
    // TODO: let's see if we can move this server-side later

    newRelationship(props);
  }

  const handleSubmitEdit = event => {
    event.preventDefault();
    props.handleClose();
    
    updateRelationship(props);
  }

  const displaySubmitButton = () => props.handleNewRelationship ? <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>Create</Button> : <Button variant="primary" type="submit" onClick={(e) => handleSubmitEdit(e)}>Edit</Button>
  
  return(
    <div>
      {displaySubmitButton()}
    </div>
  )
}

export default RelationshipSubmitButton;