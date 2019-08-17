import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";
import {lastConnection} from '../../utils'
import DeleteRelationshipButton from './DeleteRelationshipButton'

// PROPS: relationship (object)
// functions => setRelationships

const RelationshipCard = props => {
  const [person, setPerson] = useState(props.relationship)

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
      <DeleteRelationshipButton relationship={props.relationship} setRelationships={props.setRelationships} />
    </>
  )
}

export default RelationshipCard