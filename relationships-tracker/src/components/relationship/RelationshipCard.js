import React from 'react';
import { Link } from 'react-router-dom';
import {lastConnection} from '../../utils'
import DeleteRelationshipButton from './DeleteRelationshipButton'
import EditRelationshipButton from './EditRelationshipButton';

const RelationshipCard = props => {
  const person = props.relationship

  const suggestMeetup = () => {
    // If now minus last connected >= contact_frequency
    // Then make suggestion
    // Else don't
  }
  return(
    <>
      <div className='relationship-card'>
        <div className="image-container">
        <Link to={`/relationships/${props.relationship.id}`} onClick={() => props.viewRelationship(person)} >
              <img src={`${person.image}`} alt={`${person.first_name} ${person.last_name}`} />
        </Link>
        </div>
        <div>
        <Link to={`/relationships/${props.relationship.id}`} onClick={() => props.viewRelationship(person)} >
          <span>{`${person.first_name} ${person.last_name}`}</span><br/>
          <span>{person.relationship_type}</span><br/>
          <span>Last met: {lastConnection(person)}</span><br/>
        </Link>
        </div>
        <EditRelationshipButton relationship={props.relationship} viewRelationship={props.viewRelationship} updateRelationships={props.updateRelationships}/>
        <DeleteRelationshipButton relationship={props.relationship} 
        updateRelationships={props.updateRelationships}
        updateEvents={props.updateEvents}
        />
      </div>
    </>
  )
}

export default RelationshipCard