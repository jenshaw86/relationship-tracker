import React, {useState} from "react";
import {Container, Button, Form} from 'react-bootstrap';
import {signup} from './../../services/api';

const Signup = () => {
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = ev => {
    ev.persist()
    switch(ev.target.name) {
      case 'firstName':
        setFirstName(ev.target.value);
        break;
      case 'lastName':
        setLastName(ev.target.value);
        break;
      case 'email':
        setEmail(ev.target.value);
        break;
      case 'password':
        setPassword(ev.target.value);
        break;
      default:
        return null;
    }
  }
  
  const handleSubmit = ev => {
    ev.preventDefault();
    ev.persist();
    let formData = []
    for(let i = 0; i < ev.target.length - 1; i++) {
      formData.push(ev.target[i].value)
    }
    signup(formData)
    .then(res => console.log(res))
  }

  return (
    <Container>  
      <h3>New User Signup</h3>

      <Form onSubmit={ev => handleSubmit(ev)}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" placeholder="First Name" value={firstName} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>User Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>User Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Button type="submit">Sign up</Button>
      </Form>
    </Container>
  )
}

export default Signup;

// import React, {Component} from "react";
// import {Container, Button, Form} from 'react-bootstrap';
// import {signup} from './../../services/api';


// class Signup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       error: false,
//       fields: {
//         email: "",
//         password: ""
//       }
//     }
//   }

//   handleChange = ev => {
//     const newFields = {...this.state.fields, [ev.target.name]: ev.target.value}
//     this.setState({fields: newFields})
//   }

//   handleSubmit = ev => {
//     ev.preventDefault()
//     console.log(ev)
//   }

//   render() {
//     const {fields} = this.state;
//     return (
//       <Container>  
//         <h3>New User Signup</h3>
  
//         <Form>
//           <Form.Group>
//             <Form.Label>User Email</Form.Label>
//             <Form.Control type="email" name="email" placeholder="Email" value={fields.email} onChange={this.handleChange}/>
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>User Password</Form.Label>
//             <Form.Control type="password" name="password" placeholder="Password" value={fields.password} onChange={this.handleChange}/>
//           </Form.Group>
//           <Button type="submit">Sign up</Button>
//         </Form>
//       </Container>
//     )

//   }
// }

// export default Signup;