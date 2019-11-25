import { API_ROOT } from './api';

// Upon user signup, create a new user
export const signup = formData => {
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
  )
}
