// RELATIONSHIP FUNCTIONS

// display last connection date
export const lastConnection = (person) => {
  if (person.events && person.events.length !== 0) {
    let now = Date.parse(new Date());
    let filtered = person.events.filter(ev => Date.parse(ev.end_date) < now)
    if (filtered.length !== 0) {
      let last = Date(filtered[filtered.length - 1].end_date)
      let dateArr = last.split(" ");
      let [, month, date, year] = dateArr

      return `${month} ${date}, ${year}`
    } else {
      return "never"
    }
  } else {
    return "never"
  }
}

// EVENT FUNCTIONS

// display date
export const displayDate = (str) => {
  if (str) {
    const dateArray = new Date(str);
    const [day, month, date, year] = dateArray.toDateString().split(" ")
    return `${day}, ${month} ${date}, ${year}`
  }
}

// convert date to something friggin' useful
export const showDate = (str) => {
  let [fullDate, time] = str.split("T");
  let [year, month, date] = fullDate.split("-")
  let [hour, min] = time.split(":")
  return new Date(Date.UTC(year, month-1, date, hour, min))
}

// display invitees of event
export const displayInvitees = (event) => {
  if (event.relationships && event.length !==0) {
      return event.relationships.map(rel => {
          return `${rel.first_name} ${rel.last_name}`
      })
  }
}
