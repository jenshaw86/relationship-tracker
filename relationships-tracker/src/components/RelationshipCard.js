import React from 'react';

const RelationshipCard = props => {
    
    const {first_name, last_name, relationship_type, relationship_length} = props.relationship
    return(
        <div>
            <h3>{`${first_name} ${last_name}`}</h3>
            <ul>
                <li>{relationship_type}</li>
                <li>{relationship_length}</li>
            </ul>
        </div>
    )
}

export default RelationshipCard