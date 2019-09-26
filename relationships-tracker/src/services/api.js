const API_ROOT = `http://localhost:3000/api/v1`;

export const signup = (formData, history) => {
// Upon user signup, create new user
  return (
    fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }, 
      body: JSON.stringify(formData)
    })
  .then(res => res.json())
  // .then(json => {
  //   // if user creation is successful, redirect user to login
  //   if (json.user) {
  //     history.push('/login')
  //   }
  // })
  )
}

// login creates a new authorization (POST), 
// returns json object constaining authorized user and jwt
export const login = formData => {
  console.log("logging in")
  return (
    fetch(`${API_ROOT}/auth`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }) 
    .then(res => res.json())
  )
}

// getCurrentUser fetches (GET) the user that was authorized
// return json object containing user id and email
export const getCurrentUser = token => {
  return (
    fetch(`${API_ROOT}/current_user`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(res => res.json())
  )
}

const getRelationships = (token, handleSetState) => {
  console.log('getting relationships')
  return (
    fetch(`${API_ROOT}/relationships`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(res => res.json())
    .then(data => handleSetState(data))
  )
}

const getEvents = (token, handleSetState) => {
  console.log('getting events')
  return (
    fetch(`${API_ROOT}/events`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(res => res.json())
    .then(data => handleSetState(data))
  )
}

export const api = {
  auth: {
    login,
    getCurrentUser
  },
  data: {
    getRelationships,
    getEvents
  }
}
