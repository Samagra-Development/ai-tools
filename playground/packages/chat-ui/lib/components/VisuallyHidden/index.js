"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisuallyHidden = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var style = {
  position: 'absolute',
  height: '1px',
  width: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  margin: '-1px',
  // padding: 0,
  // border: 0,
  whiteSpace: 'nowrap'
};
var VisuallyHidden = function VisuallyHidden(props) {
  return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({
    style: style
  }, props));
};
exports.VisuallyHidden = VisuallyHidden;