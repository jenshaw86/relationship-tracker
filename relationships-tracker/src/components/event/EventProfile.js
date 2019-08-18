import React from 'react'
import {whoIsComing, displayDate, displayTime} from '../../utils'

const EventProfile = props => {

    return (
        <div>
            <h3>{props.event.name ? props.event.name : null}</h3> 
            <div>Date: {displayDate(props.event.start_date)} at {displayTime(props.event.start_date)} </div>
            <div>Who's going: {whoIsComing(props.event.relationships)}</div>
            <div>Where: {props.event.location}</div>
            <div>About: {props.event.description}</div>

        </div>
    )
}

export default EventProfile