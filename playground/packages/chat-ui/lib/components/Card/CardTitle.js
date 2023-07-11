"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardTitle = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "title", "subtitle", "center", "children"];
var CardTitle = function CardTitle(props) {
  var className = props.className,
    title = props.title,
    subtitle = props.subtitle,
    center = props.center,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('CardTitle', {
      'CardTitle--center': center
    }, className)
  }, other), title && /*#__PURE__*/_react.default.createElement("h5", {
    className: "CardTitle-title"
  }, title), children && typeof children === 'string' && /*#__PURE__*/_react.default.createElement("h5", {
    className: "CardTitle-title"
  }, children), subtitle && /*#__PURE__*/_react.default.createElement("p", {
    className: "CardTitle-subtitle"
  }, subtitle), children && typeof children !== 'string' && children);
};
exports.CardTitle = CardTitle;