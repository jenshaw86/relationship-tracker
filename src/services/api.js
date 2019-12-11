export const API_ROOT = `https://git.heroku.com/lit-taiga-97735.git`;

export const auth_headers = token => {
  return ({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  })
}