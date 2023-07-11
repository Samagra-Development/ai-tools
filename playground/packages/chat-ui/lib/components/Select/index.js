"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "placeholder", "variant", "children"];
var Select = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    placeholder = _ref.placeholder,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'outline' : _ref$variant,
    children = _ref.children,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/_react.default.createElement("select", (0, _extends2.default)({
    className: (0, _clsx.default)('Input Select', "Input--".concat(variant), className)
  }, rest, {
    ref: ref
  }), placeholder && /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, placeholder), children);
});
exports.Select = Select;