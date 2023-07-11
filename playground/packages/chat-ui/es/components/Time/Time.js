import React from 'react';
import formatDate from './parser';
import { useLocale } from '../LocaleProvider';
export var Time = function Time(_ref) {
  var date = _ref.date;
  var _useLocale = useLocale('Time'),
    trans = _useLocale.trans;
  return /*#__PURE__*/React.createElement("time", {
    className: "Time",
    dateTime: new Date(date).toJSON()
  }, formatDate(date, trans()));
};