function buildDateString(d, m, y) {
  let dayString = d ? d + ", " : "";
  let yearString = parseInt(y, 10) < 0
    ? y.slice(1) + " BC"
    : y;
  return m + " " + dayString + yearString;
}

export {buildDateString};
