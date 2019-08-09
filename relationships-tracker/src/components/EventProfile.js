import React, {useState, useEffect} from 'react'

const EventProfile = (props) => {
    const [event, setEvent] = useState({}) 

    useEffect(() => {
        fetch(`http://localhost:3000/events/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => setEvent(data))
    }, [props])
    
    return (
        <div>
            <h1>{event.name}</h1> 
        </div>
    )
}

export default EventProfile