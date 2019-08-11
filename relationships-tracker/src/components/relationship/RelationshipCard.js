import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

// props: 
// key={rel.id}, 
// relationship={rel}, 
// getRelationshipProfile={props.getRelationshipProfile}

const RelationshipCard = (props) => {
  // relationship properties
  const {first_name, last_name, relationship_type, image, id} = props.relationship
  
  // handle delete relationship
  const handleOnClick = () => {
    fetch(`http://localhost:3000/relationships/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => props.handleRemoveRelationship(data))
  }

  return(
    <>
      <Link to={`/relationships/${id}`} /* onClick={() => handleClick() */  >
        <div className='relationship_card'>
          <div>
            <img src={`${image}`} width="100" />
          </div>
          <div>
            <h5>{`${first_name} ${last_name}`}</h5>
            <p>{relationship_type}</p>
          </div>
        </div>
      </Link>
      <Button onClick={handleOnClick}>Remove</Button>
    </>
  )
}

export default RelationshipCard