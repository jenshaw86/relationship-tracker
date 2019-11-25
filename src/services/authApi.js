import { API_ROOT, auth_headers } from './api';

// login creates a new authorization (POST), 
// returns json object constaining authorized user and jwt
export const login = formData => {
  console.log("logging in")
  return (
    fetch(`${API_ROOT}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
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
    fetch(`${API_ROOT}/current_user`, auth_headers(token))
    .then(res => {
      return res.json()
    })
  )
}