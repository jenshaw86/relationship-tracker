import React from 'react';

const ProfileDetails = props => {
  return (
    <>
      <p>Email: {props.email}</p>
      <p>Phone: {props.phone_number}</p>
    </>
  )
}

export default ProfileDetails;