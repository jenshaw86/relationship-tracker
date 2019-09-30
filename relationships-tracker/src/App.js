import React, {Component} from 'react';
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
import {api} from './services/api'
import './styles.css'

class App extends Component {

  constructor() {
    super();

    this.state = {
      auth: {
        user: {}
      },
      currentUser: {},
      events: [],
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
      api.auth.getCurrentUser(token)
      .then(user => { 
        const updatedState = {...this.state.auth, user: user["user"]};
        this.setState({auth: updatedState});

        api.data.getRelationships(token, this.handleSetState);
        api.data.getEvents(token, this.handleSetState);
      })
    }
  }

  // handleSetState checks data for certain properties to determine which field in state to set data to
  handleSetState = data => {
    if (data.length !== 0) {
      if (data[0].first_name) {
        this.setState({relationships: data})
      } else if (data[0].location) {
        this.setState({events: data})
      }
    }
  }

  // handles login in Login component
  login = data => {
    // console.log(data.user)
    
    // create updated this.state.auth using auth POST response data containing user and JWT
    const updatedState = {...this.state.auth, user: data.user};
    
    // save JWT to local storage
    const token = data.jwt
    localStorage.setItem('token', token);
    
    // replace state.auth
    this.setState({auth: updatedState});
    // fetch relationships and events and set respective state
    api.data.getRelationships(token, this.handleSetState);
    api.data.getEvents(token, this.handleSetState);
  }

  logout = () => {
    // console.log('logging out')
    // remove token from local storage
    localStorage.removeItem('token');
    // clear state
    this.setState({auth: {user: {}} })
  }

  handleNewEvent = event => {
    fetch(`http://localhost:3000/users/1/relationships`)
    .then(res => res.json())
    .then(data => {
      this.setState({events: [...this.state.events, event], relationships: data});
    })
  }

  updateEvents = event => {
    if (event.id) { // if the arg is an object
      let events = this.state.events.map(ev => event.id === ev.id ? event : ev)
      this.setState({events: events, eventView: event})
    } else if (event.length) { //if the arg is an array
      this.setState({events: event})
    }
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

  updateUserProfile = data => {
    this.setState({currentUser: data})
  }

  render() {
    
    return(
      <div className="app">
      <Router>
        <Navbar handleLogout={this.logout} />
        <Route exact path='/' render={() => <Home user={this.state.auth.user.email} /> } /> 
        <Route path='/account' render={() => <Account user={this.state.auth.user} events={this.state.events} updateUserProfile={this.updateUserProfile} />} />
        
        {/* All and specific events */}
        <Route path="/events" 
          render={ (browserHistory) => <EventDashboard
            {...browserHistory}
            events={this.state.events} 
            relationships={this.state.relationships} 
            handleNewEvent={this.handleNewEvent} 
            updateEvents={this.updateEvents}
            viewEvent={this.viewEvent}
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