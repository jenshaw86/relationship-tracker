import React from 'react';
import { Link } from 'react-router-dom';

// props: 
// key={rel.id}, 
// relationship={rel}, 
// getRelationshipProfile={props.getRelationshipProfile}

const RelationshipCard = (props) => {
    const {
        first_name, 
        last_name, 
        relationship_type, 
        id
    } = props.relationship
    
    // const handleClick = () => {
    //     props.getRelationshipProfile(props.relationship)
    // }

    return(
        <>
            <Link to={`/relationships/${id}`} /* onClick={() => handleClick() */  >
                <div className='relationship_card'>
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <ul>
                        <li>{relationship_type}</li>
                    </ul>
                </div>
            </Link>
        </>
    )
}

export default RelationshipCard