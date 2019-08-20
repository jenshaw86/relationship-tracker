import React from 'react';
import { Link } from 'react-router-dom';
import {lastConnection} from '../../utils'
import DeleteRelationshipButton from './DeleteRelationshipButton'

const RelationshipCard = props => {
  const person = props.relationship

  const suggestMeetup = () => {
    // If now minus last connected >= contact_frequency
    // Then make suggestion
    // Else don't
  }
  return(
    <>
      <Link to={`/relationships/${props.relationship.id}`} onClick={() => props.viewRelationship(person)} >
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
          <div>
            <p>Connection cycle: Every {person.contact_frequency} days</p>
          </div>
        </div>
      </Link>
      <DeleteRelationshipButton relationship={props.relationship} 
      updateRelationships={props.updateRelationships}
      updateEvents={props.updateEvents}
      />
    </>
  )
}

export default RelationshipCard