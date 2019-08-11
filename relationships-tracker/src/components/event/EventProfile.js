import React, {useState, useEffect} from 'react'

const EventProfile = (props) => {
    const [event, setEvent] = useState({}) 

    useEffect(() => {
        fetch(`http://localhost:3000/events/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => setEvent(data))
    }, [])
    
    return (
        <div>
            <h1>{event.name ? event.name : null}</h1> 
        </div>
    )
}

export default EventProfile