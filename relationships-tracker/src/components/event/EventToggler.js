import React from 'react'

// props
// handleClick
const EventToggler = props => {
  return (
    <div>
      <p>
        <span onClick={ () => props.handleClick('past') } >Past</span> |
        <span onClick={ () => props.handleClick('upcoming') } >Upcoming</span>
      </p>
    </div>
  )
}

export default EventToggler