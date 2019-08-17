import React from 'react'
import EditRelationshipButton from './EditRelationshipButton'
import {lastConnection} from '../../utils'

const RelationshipProfile = (props) => {

  const person = props.relationship
    return (
      <div>
        <div>
          <img src={`${person.image}`} width="150" alt={`${person.first_name} ${person.last_name}`}/>
          <EditRelationshipButton relationship={props.relationship} setRelationships={props.setRelationships} setRelationshipView={props.setRelationshipView} />
        </div>
        <div>
          <h3>{person.first_name} {person.last_name}</h3>
          <p>{person.relationship_type}</p>
          <p>Last connected: {lastConnection(person)}</p>          
        </div>
        <div>
          <p>Email:</p>
          <p>{person.email}</p>
          <p>Phone:</p>
          <p>{person.phone_number}</p>
        </div>
        <div></div>
      </div>
    )
}

export default RelationshipProfile