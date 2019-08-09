import React from 'react';
import RelationshipCard from '../components/RelationshipCard'
import Button from 'react-bootstrap/Button';

// props: location, history, match, relationships(collection), getRelationshipProfile(f), 

const Relationships = (props) => {

    const displayAllRelationships = () => {
        if (props.relationships && props.relationships.length !== 0 ) {
            return props.relationships.map(rel => {
                return <RelationshipCard key={rel.id} relationship={rel} /* getRelationshipProfile={props.getRelationshipProfile} */ />
            })
        }
    }

     return (
         <div>
            <h1>All Relationships</h1>
            <Button variant="primary">Primary</Button>
            { displayAllRelationships() }
         </div> 
     )
}


export default Relationships