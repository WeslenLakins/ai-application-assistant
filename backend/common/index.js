const changeUnixTimestampFormat = (unixDate) => {
  const date = new Date(unixDate * 1000);
  return date;
};

const compareDate = (date) => {
  const date1 = new Date();
  const date2 = new Date(date);

  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    console.log("::-DATE COMPARE-::");
    return true;
  } else {
    console.log("::-DATE NOT COMPARE-::");
    return false;
  }
};
module.exports = {
  changeUnixTimestampFormat,
  compareDate,
};
