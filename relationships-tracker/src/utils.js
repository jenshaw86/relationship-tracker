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

// display full name
export const fullName = (first, last) => {
  return `${first} ${last}`
}

// filter past events
export const filterPastEvents = events => {
  if (events && events.length !== 0) {
    let now = new Date();
    now = now.toISOString();
    return events.filter(obj => obj.event.end_date < now).sort((a,b) => a.event.start_date > b.event.start_date ? -1 : 1)
  }
}

// filter upcoming events
export const filterFutureEvents = events => {
  if (events && events.length !== 0) {
    let now = new Date();
    now = now.toISOString();
    return events.filter(obj => obj.event.end_date > now).sort((a,b) => a.event.start_date < b.event.eventstart_date ? -1 : 1)
  }
}

// lists all friends coming to an event 
export const whoIsComing = invitees => {
  if (invitees && invitees.length !== 0) {
    let list = ""
    let i = 0
    while (i < invitees.length-1) {
      list += `${invitees[i].first_name} ${invitees[i].last_name}, `;
      i++;
    }
    list += `${invitees[i].first_name} ${invitees[i].last_name}`
    return list
  }
}