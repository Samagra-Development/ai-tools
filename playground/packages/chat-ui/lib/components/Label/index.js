"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["children"];
/* eslint-disable jsx-a11y/label-has-associated-control */
var Label = function Label(props) {
  var children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("label", (0, _extends2.default)({
    className: "Label"
  }, other), children);
};
exports.Label = Label;