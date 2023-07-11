"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Backdrop = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "active", "onClick"];
var Backdrop = function Backdrop(props) {
  var className = props.className,
    active = props.active,
    onClick = props.onClick,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('Backdrop', className, {
      active: active
    }),
    onClick: onClick,
    role: "button",
    tabIndex: -1,
    "aria-hidden": true
  }, rest));
};
exports.Backdrop = Backdrop;