import React from 'react'
import {Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Home = () => {

  return (
    <Container id="landing-page">
      {/* <Jumbotron> */}
        <h1>Stay Connected.</h1>
        <p>Keep track of the connections you care about <br/>
        and make plans for that next coffee date.</p>
        <p>
          <Link to="/account"><Button variant="primary">Get Started</Button></Link>
        </p>
      {/* </Jumbotron> */}
    </Container>
  )
}

export default Home