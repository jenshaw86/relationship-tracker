export const connectionGapMessage = (person, gap) => {
  if (gap !== null) {
    const message = `You met up with ${person.first_name}`;
    return gap === 1 ? `${message} yesterday.` : `${message} ${gap} days ago.`
  } else {
    return `You haven't met up with ${person.first_name} yet! 
    They'd probably love it if you invited them to coffee!`
  }
}

export const meetupReminder = (person, gap) => {
  if (gap !== null && gap >= person.contact_frequency) {
    return `It's been a while. I think it's time to make plans to get together!`
  }
}

export const findGap = pastEvents => {
  if(pastEvents && pastEvents.length > 0) {
    return connectionGap(pastEvents[0].end_date);
  } else {
    return null;
  }
}

export const findUpcomingEvents = events => {
  const now = Date.now();
  if (events && events.length) {
    let futureEvents = events.filter(event => Date.parse(event.start_date) > now)
    return futureEvents.sort((a,b) => a.start_date < b.start_date ? -1 : 1)
  } else {
    return [];
  }
}

export const findPastEvents = events => {
  const now = Date.now();
  if (events && events.length) {
    let prevEvents = events.filter(event => Date.parse(event.start_date) < now)
    return prevEvents.sort((a,b) => a.start_date > b.start_date ? -1 : 1)
  } else {
    return [];
  }
}
// reports a date string of last event with relationship
export const lastConnection = person => {
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