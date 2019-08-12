// RELATIONSHIP FUNCTIONS

// display last connection date
export const lastConnection = (person) => {
  if (person.events && person.events.length !== 0) {
    let now = Date.parse(new Date());
    let filtered = person.events.filter(ev => Date.parse(ev.end_date) < now)
    if (filtered.length !== 0) {
      let last = Date(filtered[filtered.length - 1].end_date)
      let [day, month, date, year] = last.split(" ");
      return `${month} ${date}, ${year}`
    } else {
      return "never"
    }
  } else {
    return "never"
  }
}

// EVENT FUNCTIONS

// display date MMMM-DD-YYYY 
export const displayDate = (utc) => {
  const dateArray = Date(utc).split(" ");
  const [day, month, date, year, time] = dateArray
  return `${month} ${date}, ${year}`
}

// display invitees of event
export const displayInvitees = (event) => {
  if (event.relationships && event.length !==0) {
      return event.relationships.map(rel => {
          return `${rel.first_name} ${rel.last_name}`
      })
  }
}