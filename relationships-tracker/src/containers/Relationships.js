import React, { useState, useEffect } from 'react';
import RelationshipCard from '../components/RelationshipCard'

const Relationships = () => {
    const [relationships, setRelationships] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/relationships')
        .then(res => res.json())
        .then(data => setRelationships(data))
    }, [])

    const displayAllRelationships = () => {
        if (relationships && relationships.length !== 0 ) {
            return relationships.map(rel => {
                return <RelationshipCard key={rel.id} relationship={rel} />
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