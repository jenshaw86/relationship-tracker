import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = props => {

  // If a user isn't logged in yet, homepage will display a sign up button and login option
  // else it will display a button that, when clicked, leads to user's connections page
  const getStarted = () => !props.user ? <><Link to="/signup"><Button variant="primary">Get Started</Button></Link> or <Link to="/login"> log in here</Link></> : <Link to="/relationships"><Button variant="primary">See my connections</Button></Link>

  return (
    <Container className="landing-page">
      <div className="jumbotron">
      <div className="bg-image"></div>
      <h1>Stay Connected</h1>
      <p>Keep track of the connections you care about <br/>
      and make plans for that next coffee date.</p>
      <p>{getStarted()}</p>
      </div>
    </Container>
  )
}

export default Home;