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
  .then(json => {
    // if user creation is successful, redirect user to login
    if (json.user) {
      history.push('/login')
    }
  })
  )
}

