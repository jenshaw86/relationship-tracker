import React, {useState, useEffect} from 'react'
import {whoIsComing} from '../../utils'

const EventProfile = props => {
    const [event, setEvent] = useState({}) 

    useEffect(() => {
        fetch(`http://localhost:3000/events/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => setEvent(data))
    }, [props.match.params.id])
    
    

    return (
        <div>
            <h3>{event.name ? event.name : null}</h3> 
            <h4>Who's coming?</h4>
            <p>{whoIsComing(event.relationships)}</p>
        </div>
    )
}

export default EventProfile