import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

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
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <ul>
                        <li>{relationship_type}</li>
                    </ul>
                </div>
            </Link>
            <Button onClick={handleOnClick}>Remove Relationship</Button>
        </>
    )
}

export default RelationshipCard