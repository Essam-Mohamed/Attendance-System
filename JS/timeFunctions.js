function getDate(today) {
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = today.getFullYear();
  return year + "-" + month + "-" + day;
}

function getArriveTime(today) {
  return today.toLocaleTimeString();
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function converMinute(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  return `${padTo2Digits(minutes)} minutes: ${padTo2Digits(seconds)} seconsd`;
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

function getMilliSeconds(time) {
  let hms = time;
  let hmsArray = hms.split(":");
  let seconds = +hmsArray[0] * 60 * 60 + +hmsArray[1] * 60 + +hmsArray[2];
  return seconds * 1000;
}

function getTime(time) {
  return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}

function deleteAM_PM(time) {
  return time.substring(0, time.indexOf(" "));
}

export {
  getDate,
  getArriveTime,
  padTo2Digits,
  convertMsToTime,
  getMilliSeconds,
  getTime,
  deleteAM_PM,
  converMinute,
};
