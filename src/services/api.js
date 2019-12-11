export const API_ROOT = `https://lit-taiga-97735.herokuapp.com/`;

export const auth_headers = token => {
  return ({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  })
}