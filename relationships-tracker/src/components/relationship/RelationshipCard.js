import React from 'react';
import { Link } from 'react-router-dom';
import { lastConnection } from '../../utils'
import DeleteRelationshipButton from './DeleteRelationshipButton'
import EditRelationshipButton from './EditRelationshipButton';

const RelationshipCard = props => {
  const person = props.relationship;

  return(
    <>
      <div className='relationship-card'>
        <div className="image-container">
          <Link to={`/relationships/${person.id}`} onClick={() => props.viewRelationship(person)} >
                <img src={`${person.image}`} alt={`${person.first_name} ${person.last_name}`} />
          </Link>
        </div>

        <div>
          <Link to={`/relationships/${person.id}`} onClick={() => props.viewRelationship(person)} >
            <span className="name">{`${person.first_name} ${person.last_name}`}</span><br/><br/>
          </Link>
          <span className="connection"><i class="fas fa-user"></i>{person.relationship_type}</span><br/>
          <span>Last met: {lastConnection(person)}</span><br/>
        </div>
        
        <EditRelationshipButton 
          relationship={person} 
          viewRelationship={props.viewRelationship} 
          updateRelationships={props.updateRelationships} 
          userId={props.userId} 
        />
        <DeleteRelationshipButton 
          relationship={person} 
          handleDeletedRelationship={props.handleDeletedRelationship}
          updateEvents={props.updateEvents}
        />
      </div>
    </>
  )
}

export default RelationshipCard;