const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const isInt = s => {
  if (isNaN(s)) {
    return false;
  }
  var x = parseFloat(s);
  return (x | 0) === x;
}

const isDigit = s => {
  if (isNaN(s)) {
    return false;
  }
  var x = parseFloat(s);
  return !isNaN(x);
}

module.exports = {
  formatTime, isInt, isDigit
}
