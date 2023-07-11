var REGEX_FORMAT = /YYYY|M|D|dddd|HH|mm/g;
var MS_A_DAY = 24 * 60 * 60 * 1000;
var MS_A_WEEK = MS_A_DAY * 7;
var parseDate = function parseDate(date) {
  // if (date === null) {
  //   return new Date(NaN);
  // }
  // if (typeof date === 'undefined') {
  //   return new Date(); // today
  // }
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
};
var getWeeHours = function getWeeHours() {
  return new Date(new Date().setHours(0, 0, 0, 0));
};
var padStart = function padStart(n) {
  return (n <= 9 ? '0' : '') + n;
};
var getFormat = function getFormat(date) {
  var diff = getWeeHours().getTime() - date.getTime();
  if (diff < 0) {
    return 'LT'; // 今天
  }

  if (diff < MS_A_DAY) {
    return 'YT'; // 昨天
  }

  if (diff < MS_A_WEEK) {
    return 'WT'; // 这周
  }

  return 'lll';
};
function formatDate(date, locale) {
  var $d = parseDate(date);
  var format = locale.formats[getFormat($d)];
  var dates = {
    YYYY: "".concat($d.getFullYear()),
    M: "".concat($d.getMonth() + 1),
    D: "".concat($d.getDate()),
    dddd: locale.weekdays[$d.getDay()],
    HH: padStart($d.getHours()),
    mm: padStart($d.getMinutes())
  };
  return format.replace(REGEX_FORMAT, function (match) {
    return dates[match];
  });
}
export default formatDate;