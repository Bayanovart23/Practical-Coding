const date = 1682414041244;


const dateFormat = new Date(date)

console.log("Date: " + dateFormat.getDate() +
    "/" + (dateFormat.getMonth() + 1) +
    "/" + dateFormat.getFullYear() +
    " " + dateFormat.getHours() +
    ":" + dateFormat.getMinutes() +
    ":" + dateFormat.getSeconds());
