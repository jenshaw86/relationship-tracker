const API_ROOT = `http://localhost:3000/api/v1`;


export const signup = formData => {
  const [first_name, last_name, email, password] = formData
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    }, 
    body: JSON.stringify({first_name, last_name, email, password})
  })
  .then(res => res.json)
}

