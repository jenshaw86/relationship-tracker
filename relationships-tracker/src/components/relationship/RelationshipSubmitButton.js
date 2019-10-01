import React from 'react';
import { Button } from 'react-bootstrap';
import { api } from '../../services/api'

const RelationshipSubmitButton = props => {
  
  const handleSubmit = event => {
    event.preventDefault();
    props.handleClose();
    // If user doesn't provide a url, use a default image
    // TODO: let's see if we can move this server-side
    if(props.image === '') {
      props.image = "https://www.thesun.co.uk/wp-content/uploads/2016/06/nintchdbpict000242868564.jpg"
    }

    api.post.newRelationship(props);
  }

  const handleSubmitEdit = event => {
    event.preventDefault();
    props.handleClose();
    
    api.patch.updateRelationship(props);
  }

  const displaySubmitButton = () => props.handleNewRelationship ? <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>Create</Button> : <Button variant="primary" type="submit" onClick={(e) => handleSubmitEdit(e)}>Edit</Button>
  
  return(
    <div>
      {displaySubmitButton()}
    </div>
  )
}

export default RelationshipSubmitButton;