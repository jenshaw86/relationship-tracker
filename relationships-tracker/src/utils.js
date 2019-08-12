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