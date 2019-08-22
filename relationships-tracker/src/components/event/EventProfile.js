import React from 'react'
import {Container} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {whoIsComing, displayDateString, displayDay, displayMonth, displayDate, displayYear, displayTime} from '../../utils'

const EventProfile = props => {
    if (props.event.name) {
        return (
            <Container className="event-profile">
                <div className="event-profile-top">
                    <span className="day">{displayDay(props.event.start_date)}</span>

                    <div className="event-date">
                        <span className="month">{displayMonth(props.event.start_date)}</span><br/>
                        <span className="date">{displayDate(props.event.start_date)}</span><br/>
                        <span className="year">{displayYear(props.event.start_date)}</span>
                    </div>
                    
                    <div className="event-profile-header">
                        <h3>{props.event.name ? props.event.name : null}</h3> 
                        <span>with {whoIsComing(props.event.relationships)}</span>
                    </div>

                    <div className="event-profile-subinfo">
                        <span>{displayDateString(props.event.start_date)} at {displayTime(props.event.start_date)}</span><br/>
                        <span>{props.event.location}</span><br/>
                    </div>
                    <div className="event-description">
                        <p>More about this event:</p> 
                        <p>{props.event.description}</p>
                    </div>
                </div>
               
            </Container>
        )
    } else {
        return <Redirect to="/events/upcoming" />
    }

    
}

export default EventProfile