export function getFormattedDate(date) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const day = days[date.getDay()];
  const todayDate = date.getDate();
  const month = months[date.getMonth()];
  // return day + ", " + todayDate + " " + month;
  return todayDate + " " + month;
}

export function getCurrentDate(day) {
  const diff = Date.now();
  const now = new Date(diff);
  if (day) {
    now.setDate(now.getDate() + day);
  }
  return now;
}
