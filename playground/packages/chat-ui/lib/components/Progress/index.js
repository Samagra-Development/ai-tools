"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "value", "status", "children"];
var Progress = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    value = props.value,
    status = props.status,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('Progress', status && "Progress--".concat(status), className),
    ref: ref
  }, other), /*#__PURE__*/_react.default.createElement("div", {
    className: "Progress-bar",
    role: "progressbar",
    style: {
      width: "".concat(value, "%")
    },
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, children));
});
exports.Progress = Progress;