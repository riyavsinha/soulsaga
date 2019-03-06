function buildDateString(d, m, y) {
  let dayString = d ? d + ", " : "";
  let yearString = parseInt(y, 10) < 0
    ? y.slice(1) + " BC"
    : y;
  return m + " " + dayString + yearString;
}

function buildDateTime(d, m, y) {
  const MONTHS = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  var date = new Date();
  if (d === '' && m === '') {
    date.setFullYear(parseInt(y, 10));
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
  } else if (d === '') {
    date.setFullYear(parseInt(y, 10));
    date.setMonth(MONTHS[m] - 1);
    date.setDate(1);
    date.setHours(1);
    date.setMinutes(0);
  } else {
    date.setFullYear(parseInt(y, 10));
    date.setMonth(MONTHS[m] - 1);
    date.setDate(parseInt(d, 10));
    date.setHours(1);
    date.setMinutes(1);
  }
  return date.getTime();
};

export {buildDateString, buildDateTime};
