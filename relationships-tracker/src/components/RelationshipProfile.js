import React, {useState, useEffect} from 'react'

const RelationshipProfile = (props) => {
    const [person, setPerson] = useState({}) 

    useEffect(() => {
        fetch(`http://localhost:3000/relationships/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => setPerson(data))
    }, [props])
    
    return (
        <div>
            <h1>{person.first_name}'s Profile</h1>
            
        </div>
    )
}

export default RelationshipProfile