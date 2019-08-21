import React from 'react'
import {Jumbotron, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Home = () => {

  return (
    <div id="landing-page">
      <Jumbotron>
        <h1>Stay Connected.</h1>
        <p>This time, actually keep track of the relationships you care about <br/>
        and make plans for that next coffee date.</p>
        <p>
          <Link to="/account"><Button variant="primary">Get Started</Button></Link>
        </p>
      </Jumbotron>
    </div>
  )
}

export default Home