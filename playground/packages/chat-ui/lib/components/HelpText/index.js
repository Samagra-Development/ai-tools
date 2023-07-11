"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpText = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["children"];
var HelpText = function HelpText(props) {
  var children = props.children,
    others = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: "HelpText"
  }, others), children);
};
exports.HelpText = HelpText;