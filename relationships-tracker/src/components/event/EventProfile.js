import React from 'react'
import {Redirect} from 'react-router-dom'
import {whoIsComing, displayDate, displayTime} from '../../utils'

const EventProfile = props => {

    if (props.event.name) {
        console.log(props.event)
        return (
            <div>
                <h3>{props.event.name ? props.event.name : null}</h3> 
                <div>Date: {displayDate(props.event.start_date)} at {displayTime(props.event.start_date)} </div>
                <div>Who's going: {whoIsComing(props.event.relationships)}</div>
                <div>Where: {props.event.location}</div>
                <div>About: {props.event.description}</div>
    
            </div>
        )
    } else {
        return <Redirect to="/events/upcoming" />
    }

    
}

export default EventProfile