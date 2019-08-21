import React from 'react'
import {Redirect} from 'react-router-dom'
import EditRelationshipButton from './EditRelationshipButton'
import {lastConnection, connectionGap, displayPhoneNumber} from '../../utils'
import EventsList from '../event/EventsList'
import AddEventButton from '../event/AddEventButton'

const RelationshipProfile = (props) => {
  const person = props.relationship
  let gap = connectionGap(person);


  const connectionGapMessage = gap => {
    if (gap !== null) {
      return `It's been ${gap} days since you've met up with ${person.first_name}.`
    } else {
      return `You haven't met up with ${person.first_name} yet! `
    }
  }

  const meetupReminder = () => {
    if (gap >= person.contact_frequency) {
      return `Maybe it's time to make plans to meet up!`
    }
  }

  if(props.relationship.first_name) {
    return (
      <div>
        <div>
          <img src={`${person.image}`} width="150" alt={`${person.first_name} ${person.last_name}`}/>
          <EditRelationshipButton relationship={props.relationship}
          viewRelationship={props.viewRelationship} 
          updateRelationships={props.updateRelationships}
          />
          <AddEventButton updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship} relationship={props.relationship} handleNewEvent={props.handleNewEvent} relationships={props.relationships}/>
        </div>
        <div>
          <h3>{person.first_name} {person.last_name}</h3>
          <p>{person.relationship_type}</p>
          <p>Last connected: {lastConnection(person)}</p> 
          <p>Connection cycle: Every {person.contact_frequency} days</p>
          <p>{connectionGapMessage(gap)} </p>
          <p>{meetupReminder()}</p>
        </div>
        <div>
          <p>Email:</p>
          <p>{person.email}</p>
          <p>Phone:</p>
          <p>{displayPhoneNumber(person.phone_number)}</p>
        </div>
        <EventsList events={props.relationship.events} viewEvent={props.viewEvent} />
      </div>
    )
  } else {
    return <Redirect to="/relationships" />
  }

    
}

export default RelationshipProfile