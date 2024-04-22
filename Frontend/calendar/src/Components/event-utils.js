let eventGuid = 0;

export function createEventId() {
  //console.log("Id_created", {eventGuid});
  return String(eventGuid++);
}

function todayStr() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Ensure leading zeros for single-digit months and days
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}
