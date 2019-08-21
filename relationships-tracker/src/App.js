import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import EventDashboard from './components/event/EventDashboard'
import EventProfile from './components/event/EventProfile'
import Home from './containers/Home'
import Account from './components/profile/Account'
import RelationshipsList from './components/relationship/RelationshipsList'
import RelationshipProfile from './components/relationship/RelationshipProfile'
import './styles.css'

class App extends Component {

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

  // updateEvents = data => this.setState({events: data})
  updateEvents = event => {
    let events = this.state.events.map(ev => event.id === ev.id ? event : ev)
    this.setState({events: events, eventView: event})
  }


  viewEvent = event => {
    this.setState({eventView: event})
  }

  handleNewRelationship = (newRelationship) => {
    this.setState({relationships: [...this.state.relationships, newRelationship]})
  }

  viewRelationship = (person) => {
    this.setState({relationshipView: person})
  }

  updateRelationships = relationship => {
    let relationships = this.state.relationships.map(rel => rel.id === relationship.id ? relationship : rel)
    this.setState({relationships: relationships})
  }

  updateUserProfile = data => {
    this.setState({currentUser: data})
  }

  render() {
    return(
      <div className="app">
      <Router>

       
      <Navbar />
      <Route path='/' exact render={() => <Home /> } /> 
      <Route path='/account' render={() => <Account user={this.state.currentUser} events={this.state.events} updateUserProfile={this.updateUserProfile} />} />
      
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

      <Route path='/event/:name' render={ () => <EventProfile event={this.state.eventView} />} />

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
          relationships={this.state.relationships}
          viewRelationship={this.viewRelationship}
          updateRelationships={this.updateRelationships}
          handleNewEvent={this.handleNewEvent} 
          viewEvent={this.viewEvent}
          /> } 
      />
      </Router>
    </div>
    )
  }
}

export default App;