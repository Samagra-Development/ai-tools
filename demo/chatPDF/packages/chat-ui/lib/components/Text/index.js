"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["as", "className", "align", "breakWord", "truncate", "children"];
var Text = function Text(props) {
  var _props$as = props.as,
    Element = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    align = props.align,
    breakWord = props.breakWord,
    truncate = props.truncate,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var ellipsis = Number.isInteger(truncate);
  var cls = (0, _clsx.default)(align && "Text--".concat(align), {
    'Text--break': breakWord,
    'Text--truncate': truncate === true,
    'Text--ellipsis': ellipsis
  }, className);
  var style = ellipsis ? {
    WebkitLineClamp: truncate
  } : null;
  return /*#__PURE__*/_react.default.createElement(Element, (0, _extends2.default)({
    className: cls,
    style: style
  }, other), children);
};
exports.Text = Text;