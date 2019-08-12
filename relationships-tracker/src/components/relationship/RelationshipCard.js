import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {lastConnection} from '../../utils'
// props: 
// id={rel.id}, 
// relationship={rel}, 
// getRelationshipProfile={props.getRelationshipProfile}

const RelationshipCard = props => {
  const [person, setPerson] = useState({})
  
  useEffect( () => {
    fetch(`http://localhost:3000/relationships/${props.id}`)
    .then(res => res.json())
    .then(obj => setPerson(obj))
  }, [props.id])
  // relationship properties
  // const {first_name, last_name, relationship_type, image, events, id} = props.relationship
  
  // handle delete relationship
  const handleOnClick = () => {
    fetch(`http://localhost:3000/relationships/${props.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => props.handleRemoveRelationship(data))
  }  

  return(
    <>
      <Link to={`/relationships/${props.id}`} >
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