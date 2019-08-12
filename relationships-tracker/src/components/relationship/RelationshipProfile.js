import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import {lastConnection} from '../../utils'

const RelationshipProfile = (props) => {
    const [person, setPerson] = useState({}) 

    useEffect(() => {
        fetch(`http://localhost:3000/relationships/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            return setPerson(data)
        }
    )}, [props.match.params.id])

    return (
      <div>
        <div>
          <img src={`${person.image}`} width="150" alt={`${person.first_name} ${person.last_name}`}/>
          <Button>Edit Relationship</Button>
        </div>
        <div>
          <h4>{person.first_name} {person.last_name}</h4>
          <p>{person.relationship_type}</p>
          <p>Last connected: {lastConnection(person)}</p>          
        </div>
        <div>
          <p>Email:</p>
          <p>{person.email}</p>
          <p>Phone:</p>
          <p>{person.phone_number}</p>
        </div>
        <div></div>
      </div>
    )
}

export default RelationshipProfile