import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {lastConnection} from '../../utils'

// PROPS: relationship (object)
// functions => setRelationships

const RelationshipCard = props => {
  const [person, setPerson] = useState(props.relationship)
  
  // handle delete relationship
  const handleOnClick = () => {
    fetch(`http://localhost:3000/relationships/${props.relationship.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => props.setRelationships(data))
  }  

  return(
    <>
      <Link to={`/relationships/${props.relationship.id}`} >
        <div className='relationship_card'>
          <div>
            <img src={`${person.image}`} width="100" alt={`${person.first_name} ${person.last_name}`} />
          </div>
          <div>
            <h5>{`${person.first_name} ${person.last_name}`}</h5>
            <p>{person.relationship_type}</p>
          </div>
          <div>
            <p>Last connected: {lastConnection(person)}</p>
          </div>
        </div>
      </Link>
      <Button onClick={handleOnClick}>Remove</Button>
    </>
  )
}

export default RelationshipCard