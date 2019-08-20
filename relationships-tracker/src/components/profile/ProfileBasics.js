import React from 'react';
import {Redirect} from 'react-router-dom'

const ProfileBasics = props => {
  if (props.user.first_name) {
    return (
      <>
        <p>Email: {props.user.email}</p>
        <p>Phone: {props.user.phone_number}</p>
      </>
    )
  } else {
    return <Redirect to="/account/basic" />
  }
}

export default ProfileBasics;