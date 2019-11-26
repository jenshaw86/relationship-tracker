import React from 'react'
import {Container} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import EditRelationshipButton from './EditRelationshipButton'
import {displayPhoneNumber} from '../../utils'
import {findUpcomingEvents, findPastEvents, findGap, connectionGapMessage, meetupReminder, lastConnection} from '../../utils/relationshipUtils'
import EventsList from '../event/EventsList'

const RelationshipProfile = props => {
  const person = props.relationship;
  const events = person.events;
  
  const upcomingEvents = findUpcomingEvents(events);
  const pastEvents = findPastEvents(events);

  const gap = findGap(pastEvents);

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
            <span>{connectionGapMessage(person, gap)} </span>
            <span>{meetupReminder(person, gap)}</span><br/>
          </div>

          <div className="profile-stats">
            <p><span>Last meetup:</span><br/>
             {lastConnection(person)}</p>
            {/* <p>Next meetup:<br/>
            {nextMeetup(person)}</p> */}
            <p><span>Meetup cycle:</span><br/>
             Every {person.contact_frequency} days</p><br/>
          </div>

          <EventsList 
            userId={props.userId}
            relationship={props.relationship} 
            relationships={props.relationships} 
            viewRelationship={props.viewRelationship} 
            updateRelationships={props.updateRelationships} 
            events={upcomingEvents} 
            viewEvent={props.viewEvent} 
            handleNewEvent={props.handleNewEvent}
            handleDeletedEvent={props.handleDeletedEvent}
            />


      </Container>
    )
  } else {
    return <Redirect to="/relationships" />
  }

    
}

export default RelationshipProfile