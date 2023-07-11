"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "size", "fluid", "children"];
var Card = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    size = props.size,
    fluid = props.fluid,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('Card', size && "Card--".concat(size), {
      'Card--fluid': fluid
    }, className),
    "data-fluid": fluid
  }, other, {
    ref: ref
  }), children);
});
exports.Card = Card;