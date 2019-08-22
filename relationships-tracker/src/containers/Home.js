import React from 'react'
import {Container, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Home = () => {

  return (

    <Container className="landing-page">
      {/* <Jumbotron> */}
        <div className="jumbotron">
        <div className="bg-image">
        </div>
        <h1>Stay Connected.</h1>
        <p>Keep track of the connections you care about <br/>
        and make plans for that next coffee date.</p>
        <p>
          <Link to="/account"><Button variant="primary">Get Started</Button></Link>
        </p>
        </div>
      {/* </Jumbotron> */}
    </Container>

  )
}

export default Home