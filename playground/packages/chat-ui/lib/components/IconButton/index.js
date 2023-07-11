"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Button = require("../Button");
var _Icon = require("../Icon");
var _excluded = ["className", "icon", "img"];
var IconButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    icon = props.icon,
    img = props.img,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Button.Button, (0, _extends2.default)({
    className: (0, _clsx.default)('IconBtn', className),
    ref: ref
  }, other), icon && /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: icon
  }), !icon && img && /*#__PURE__*/_react.default.createElement("img", {
    src: img,
    alt: ""
  }));
});
exports.IconButton = IconButton;