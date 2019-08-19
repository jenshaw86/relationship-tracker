import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Navbar from './components/Navbar'
import EventDashboard from './components/event/EventDashboard'
import EventProfile from './components/event/EventProfile'
import Home from './containers/Home'
import Account from './containers/Account'
import RelationshipsList from './components/relationship/RelationshipsList'
import RelationshipProfile from './components/relationship/RelationshipProfile'
// import Logout from './components/Logout'

// import {filterFutureEvents} from './utils'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentUser: {},
      events: [],
      relationships: [], 
      eventView: {},
      relationshipView: {}
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/1`) //TODO: specify user on login
    .then(res => res.json())
    .then(user => {
      fetch(`http://localhost:3000/users/1/relationships`)
      .then(res => res.json())
      .then(user_relationships => {
        fetch(`http://localhost:3000/users/1/events`)
        .then(res => res.json())
        .then(user_events => {
          this.setState({currentUser: user, relationships: user_relationships, events: user_events})
        })
      })
    })
  }

  handleNewEvent = event => {
    fetch(`http://localhost:3000/users/1/relationships`)
    .then(res => res.json())
    .then(data => {
      this.setState({events: [...this.state.events, event], relationships: data});
    })
  }

  updateEvents = data => this.setState({events: data})

  viewEvent = event => {
    this.setState({eventView: event})
  }

  handleNewRelationship = (newRelationship) => {
    this.setState({relationships: [...this.state.relationships, newRelationship]})
  }

  viewRelationship = (person) => {
    this.setState({relationshipView: person})
  }

  updateRelationships = data => {
    this.setState({relationships: data})
  }

  render() {
    return(
      <div>
      <Router>

      <Navbar />
      
      <Route path='/' exact render={() => <Home /> } /> 
      <Route path='/account' exact render={ () => <Account user={this.state.currentUser} />} />
      {/* All and specific events */}
      <Route path="/events"
        render={ (browserHistory) => <EventDashboard
          {...browserHistory}
          events={this.state.events} 
          relationships={this.state.relationships} 
          handleNewEvent={this.handleNewEvent} 
          updateEvents={this.updateEvents}
          viewEvent={this.viewEvent}
      /> } />

      <Route path='/events/:time/:name' render={ () => <EventProfile event={this.state.eventView} />} />

      {/* All relationships */}
      <Route path="/relationships" exact 
        render={() => <RelationshipsList 
          relationships={this.state.relationships} 
          handleNewRelationship={this.handleNewRelationship} 
          viewRelationship={this.viewRelationship}
          updateRelationships={this.updateRelationships}
          updateEvents={this.updateEvents}
          /> } 
      />
      <Route path="/relationships/:id" 
        render={ () => <RelationshipProfile 
          relationship={this.state.relationshipView}
          viewRelationship={this.viewRelationship}
          updateRelationships={this.updateRelationships}
          viewEvent={this.viewEvent}
          /> } 
      />
      </Router>
    </div>
    )
  }
}

export default App;