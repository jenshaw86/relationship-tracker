// RELATIONSHIP FUNCTIONS

// reports a date string of last event with relationship
export const lastConnection = (person) => {
  // if the person has at least one event
  if (person.events.length > 0) {
    // get the current time in seconds
    const now = Date.now();
    // filter the dates so that we only get past dates
    const filtered = person.events.filter(ev => Date.parse(ev.end_date) < now).sort((a,b) => a.end_date - b.end_date)
    // if there were any past events
    if (filtered.length > 0) {
      // find the most recent past event
      const mostRecentEvent = filtered[filtered.length - 1];
      // convert date to date object
      const endTime = new Date(mostRecentEvent.end_date)
      // convert date object to string
      const dateArr = endTime.toString().split(" ");
      const [day, month, date, year] = dateArr;
      return `${day} ${month} ${date}, ${year}`
    }
  }
  return "You haven't met up yet!"
}

// The amt of time between now and the last event
export const connectionGap = date => {
  const now = Date.now();
  const last = Date.parse(date);
  const gapSecs = Math.abs(now - last);
  const gapDays = Math.ceil(gapSecs/(60*60*24*1000));
  return gapDays;
}


// EVENT FUNCTIONS


const getDateSections = str => {
  let dateArray = new Date(str)
  return dateArray.toDateString().split(" ")

}

export const displayDay = str => {
  const [day] = getDateSections(str)
  return day;
}

export const displayMonth = str => {
  const [, month] = getDateSections(str)
  return month
}

export const displayDate = str => {
  const [, , date] = getDateSections(str)
  return date
}

export const displayYear = str => {
  const [,,, year] = getDateSections(str)
  return year
}

export const displayDateString = (str) => {
  let dateArray = new Date(str)
  const [day, month, date, year] = dateArray.toDateString().split(" ")
  return `${day}, ${month} ${date}, ${year}`
}

export const displayTime = str => {
  let dateArray = new Date(str)
  let time = dateArray.toTimeString().split(" ")[0]
  let [hour, min] = time.split(":")
  let meridiem = "am"
  if (hour === "00") {
    hour = "12"
  } else if (hour > 12) {
    hour = hour - 12;
    meridiem = "pm"
  } else if (hour < 10) {
    hour = hour.slice(1,2)
  }
  return `${hour}:${min} ${meridiem}`
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
    return events.filter(event => event.end_date < now).sort((a,b) => a.start_date > b.start_date ? -1 : 1)
  }
}

// filter upcoming events
export const filterFutureEvents = events => {
  if (events && events.length !== 0) {
    let now = new Date();
    now = now.toISOString();
    return events.filter(event => event.end_date > now).sort((a,b) => a.start_date < b.start_date ? -1 : 1)
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

export const displayPhoneNumber = num => {
  if (num) {
    let country = num.slice(0,2)
    let area = num.slice(2,5)
    let office = num.slice(5,8)
    let line = num.slice(8)
    return `${country} (${area}) ${office}-${line}`
  } else {
    return "not given"
  }
}