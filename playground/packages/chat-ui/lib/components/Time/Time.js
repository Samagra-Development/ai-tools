"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Time = void 0;
var _react = _interopRequireDefault(require("react"));
var _parser = _interopRequireDefault(require("./parser"));
var _LocaleProvider = require("../LocaleProvider");
var Time = function Time(_ref) {
  var date = _ref.date;
  var _useLocale = (0, _LocaleProvider.useLocale)('Time'),
    trans = _useLocale.trans;
  return /*#__PURE__*/_react.default.createElement("time", {
    className: "Time",
    dateTime: new Date(date).toJSON()
  }, (0, _parser.default)(date, trans()));
};
exports.Time = Time;