import React, {useState, useEffect} from 'react'

const RelationshipProfile = (props) => {
    const [person, setPerson] = useState({}) 

    useEffect(() => {
        fetch(`http://localhost:3000/relationships/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            return setPerson(data)
        }
    )}, [])

    return (
        <div>
            <div>
                
            </div>
            
        </div>
    )
}

export default RelationshipProfile