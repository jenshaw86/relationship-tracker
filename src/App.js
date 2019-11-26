import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import EventDashboard from './components/event/EventDashboard'
import EventProfile from './components/event/EventProfile'
import Home from './containers/Home'
import Account from './components/profile/Account'
import RelationshipsList from './components/relationship/RelationshipsList'
import RelationshipProfile from './components/relationship/RelationshipProfile'
import SignUp from './components/user/Signup'
import Login from './components/user/Login'
import {getRelationships, getRelationship} from './services/relationshipsApi'
import {getEvents} from './services/eventsApi'
import {getCurrentUser} from './services/authApi'
import './styles.css'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: {
        user: {}
      },
      events: {
        future_events: [],
        past_events: []
      },
      relationships: [], 
      eventView: {},
      relationshipView: {}
    }
  }

  // after component mounts, check if token is in local storage
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      // console.log("found a token!")
      
      // in case page is refreshed, instead of state returning to a blank slate
      // use token to get current user and set current user state
      getCurrentUser(token)
      .then(user => { 
        const updatedState = {...this.state.auth, user: user["user"]};
        this.setState({auth: updatedState});
        getRelationships(token, this.handleSetState);
        getEvents(token, this.handleSetState);
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.events !== prevState.events) {
      const token = localStorage.getItem('token');
      getRelationships(token, this.handleSetState);
      getRelationship(this.state.relationshipView, this.viewRelationship);
    }
  }
  // handleSetState checks data for certain properties to determine which field in state to set data to
  handleSetState = data => {
    // * event data is an object, while relationship data is an array
    if (Array.isArray(data)) {
      this.setState({relationships: data})
    } else {
      this.setState({events: data}) 
    }
  }

  // handles login in Login component
  login = data => {
    
    // create updated this.state.auth using auth POST response data containing user and JWT
    const updatedState = {...this.state.auth, user: data.user};
    
    // save JWT to local storage
    const token = data.jwt
    localStorage.setItem('token', token);
    
    // replace state.auth
    this.setState({auth: updatedState});
    // fetch relationships and events and set respective state
    getRelationships(token, this.handleSetState);
    getEvents(token, this.handleSetState);
  }

  logout = () => {
    // console.log('logging out')
    // remove token from local storage
    localStorage.removeItem('token');
    // clear state
    this.setState({auth: {user: {}} })
  }

  handleNewEvent = newEvent => {
    let events = [...this.state.events.future_events, newEvent].sort((a,b) => b.start_date > a.start_date ? -1 : 1);
    this.setState({events: {...this.state.events, future_events: events}});
    this.setState({eventView: newEvent});
  }

  updateEvents = event => {
    if (Array.isArray(event)) { //if the arg is an array from relationship profile events list
      this.setState({events: event})
    } else { // if the arg is an object from all events dashboard
      let futureEvents = this.state.events.future_events.map(ev => event.id === ev.id ? event : ev)
      let events = {...this.state.events, future_events: futureEvents}
      this.setState({events: events, eventView: event})
    }
  }

  handleDeletedEvent = updatedEvents => {
    this.setState({events: updatedEvents})
  }

  viewEvent = event => {
    this.setState({eventView: event})
  }

  handleNewRelationship = (newRelationship) => {
    this.setState({relationships: [newRelationship, ...this.state.relationships]})
    this.setState({relationshipView: newRelationship})
  }

  viewRelationship = (person) => {
    this.setState({relationshipView: person})
  }

  updateRelationships = relationship => {
    let relationships = this.state.relationships.map(rel => rel.id === relationship.id ? relationship : rel)
    this.setState({relationships: relationships})
  }

  handleDeletedRelationship = updatedRelationships => {
    this.setState({relationships: updatedRelationships})
  }

  updateUserProfile = data => {
    this.setState({auth: {user: data.user}})
  }

  render() {
    
    return(
      <div className="app">
      <Router>
        <Navbar handleLogout={this.logout} />
        <Route exact path='/' render={() => <Home user={this.state.auth.user.email} /> } /> 
        <Route path='/account' render={() => <Account user={this.state.auth.user} events={this.state.events} updateUserProfile={this.updateUserProfile} />} />
        
        {/* All and specific events */} 
        {/* ? do we need to in include relationships data in this component? YES, we do -- for the form data. */}
        <Route path="/events" 
          render={ (browserHistory) => <EventDashboard
            {...browserHistory}
            userId={this.state.auth.user.id}
            events={this.state.events} 
            relationships={this.state.relationships} 
            handleNewEvent={this.handleNewEvent} 
            viewEvent={this.viewEvent}
            updateEvents={this.updateEvents}
            handleDeletedEvent={this.handleDeletedEvent}
            viewRelationship={this.viewRelationship}
            updateRelationships={this.updateRelationships}
        /> } />

        <Route path='/event/:name' render={ () => <EventProfile event={this.state.eventView} />} />

        {/* All relationships */}
        <Route path="/relationships" exact 
          render={() => <RelationshipsList 
            userId={this.state.auth.user.id}
            relationships={this.state.relationships} 
            handleNewRelationship={this.handleNewRelationship} 
            viewRelationship={this.viewRelationship}
            updateRelationships={this.updateRelationships}
            handleDeletedRelationship={this.handleDeletedRelationship}
            updateEvents={this.updateEvents}
            /> } 
        />

        <Route path="/relationships/:id" 
          render={ () => <RelationshipProfile 
            userId={this.state.auth.user.id}
            relationship={this.state.relationshipView}
            relationships={this.state.relationships}
            viewRelationship={this.viewRelationship}
            updateRelationships={this.updateRelationships}
            handleNewEvent={this.handleNewEvent} 
            handleDeletedEvent={this.handleDeletedEvent}
            viewEvent={this.viewEvent}
            events={this.state.events}
            /> } 
        />

        <Route path="/signup" component={SignUp}/>
        <Route path="/login" render={props => <Login {...props} handleLogin={this.login} /> } />
        <Route path="/logout" component={Home}/>

      </Router>
    </div>
    )
  }
}

export default App;