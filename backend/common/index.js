const changeUnixTimestampFormat = (unixDate) => {
  const date = new Date(unixDate * 1000);
  return date;
};

module.exports = {
  changeUnixTimestampFormat,
};
