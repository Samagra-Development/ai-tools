"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessoryWrap = void 0;
var _react = _interopRequireDefault(require("react"));
var _ClickOutside = require("../ClickOutside");
var AccessoryWrap = function AccessoryWrap(_ref) {
  var onClickOutside = _ref.onClickOutside,
    children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_ClickOutside.ClickOutside, {
    onClick: onClickOutside
  }, children);
};
exports.AccessoryWrap = AccessoryWrap;