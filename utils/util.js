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
  isInt, isDigit
}
