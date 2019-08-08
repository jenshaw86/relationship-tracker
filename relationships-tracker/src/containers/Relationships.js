import React from 'react';
import RelationshipCard from '../components/RelationshipCard'

// props : 
// relationships: []

const Relationships = props => {
 
    const displayAllRelationships = () => {
        if (props.relationships && props.relationships.length !== 0 ) {
            return props.relationships.map( rel => {
                return <RelationshipCard relationship={rel} />
            })
        }
    }

     return (
         <div>
            <h1>All Relationships</h1>
            { displayAllRelationships() }
         </div>
     )
}


export default Relationships