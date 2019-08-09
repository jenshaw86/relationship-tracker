import React from 'react';
import {BrowserRouter as Router, Link } from 'react-router-dom';

const RelationshipCard = (props) => {
    
    const {
        first_name, 
        last_name, 
        relationship_type, 
        relationship_length, 
        id
    } = props.relationship
    

    
    return(
        <div>
            <Link to={`/relationships/${id}`}>
                <div className='relationship_card'>
                    <h3>{`${first_name} ${last_name}`}</h3>
                    <ul>
                        <li>{relationship_type}</li>
                        <li>{relationship_length}</li>
                    </ul>
                </div>
            </Link>
        </div>
    )
}

export default RelationshipCard