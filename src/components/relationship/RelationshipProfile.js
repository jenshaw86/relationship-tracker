import React, { useState, useEffect } from 'react'
import {Container} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import EditRelationshipButton from './EditRelationshipButton'
import {lastConnection, connectionGap, filterFutureEvents, displayPhoneNumber, displayDateString} from '../../utils'
import EventsList from '../event/EventsList'

const RelationshipProfile = (props) => {

  // futureEvents lists all of the events that start after the current time
  const futureEvents = () => {
    if (props.events.length !== 0) {
    props.events.filter(ev => {
      return (ev.relationships[0].id === props.relationship.id) && ((new Date(ev.start_date).getTime()) > (new Date()).getTime())
    }).sort((a,b) => (new Date(a.start_date)).getTime() - (new Date(b.start_date)).getTime())
    } else {
      return []
    }
  }

  const [events, setEvents] = useState(futureEvents)
  
  useEffect(() => {
    setEvents(futureEvents)
  }, [props.events])
// Did it break? Check this argument

  const person = props.relationship
  let gap = connectionGap(person);
  const connectionGapMessage = gap => {
    if (gap !== null) {
      if (gap === 1) {
        return `You met up with ${person.first_name} yesterday.`
      } else {
        return `You met up with ${person.first_name} ${gap} days ago.`
      }
    } else {
      return `You haven't met up with ${person.first_name} yet! 
      They'd probably love it if you invited them to coffee!`
    }
  }

  const meetupReminder = () => {
    if (gap !== null && gap >= person.contact_frequency) {
      return `It's been a while. I think it's time to make plans to get together!`
    }
  }

  const nextMeetup = person => {
    if (person.events.length !== 0) {
      let upcoming = filterFutureEvents(person.events)
    
      let mostRecentEv = upcoming.sort((a,b) => a.startDate.getTime() - b.startDate.getTime())[0]
      displayDateString(mostRecentEv.start_date)
    } else {
      return `No plans to meet up yet.`
    }
  }

  const mostRecentEvent = (a, b) => {
    let recentA = 0;
    let recentB = 0;
    let now = (new Date()).getTime()

    a.events.forEach(ev => {
      let endDate = new Date(ev.end_date.toLocaleString()).getTime()
      if (endDate < now && endDate > recentA) {
        recentA = endDate
      }
    })
    b.events.forEach(ev => {
      let endDate = new Date(ev.end_date.toLocaleString()).getTime()
      if (endDate < now && endDate > recentB) {
        recentB = endDate
      }
    })
    return recentA > recentB ? -1 : 1
  }

  if(props.relationship.first_name) {
    return (
      <Container className="profile-container">
          <img src={`${person.image}`} className="profile-img" alt={`${person.first_name} ${person.last_name}`}/>
          <div className="profile-info">
            <h1>{person.first_name} {person.last_name}</h1><br/>
            
            <span className="connection"><i class="fas fa-user"></i>{person.relationship_type}</span><br/>
            <span><i class="fas fa-envelope"></i> Email: {person.email}</span><br/>
            <span><i class="fas fa-mobile-alt"></i> Phone: {displayPhoneNumber(person.phone_number)}</span><br/>
          </div>


            <EditRelationshipButton relationship={props.relationship}
            viewRelationship={props.viewRelationship} 
            updateRelationships={props.updateRelationships}
          />


          <div className="reminders">
            <p>Reminders:</p>
            <span>{connectionGapMessage(gap)} </span>
            <span>{meetupReminder()}</span><br/>
          </div>

          <div className="profile-stats">
            <p><span>Last meetup:</span><br/>
             {lastConnection(person)}</p>
            {/* <p>Next meetup:<br/>
            {nextMeetup(person)}</p> */}
            <p><span>Meetup cycle:</span><br/>
             Every {person.contact_frequency} days</p><br/>
          </div>

            {/* <AddEventButton updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship} relationship={props.relationship} handleNewEvent={props.handleNewEvent} relationships={props.relationships}/> */}


            <EventsList events={events} viewEvent={props.viewEvent} updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship} relationship={props.relationship} handleNewEvent={props.handleNewEvent} relationships={props.relationships} />


      </Container>
    )
  } else {
    return <Redirect to="/relationships" />
  }

    
}

export default RelationshipProfile