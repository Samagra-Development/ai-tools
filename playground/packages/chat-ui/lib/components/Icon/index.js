"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["type", "className", "spin", "name"];
var Icon = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var type = props.type,
    className = props.className,
    spin = props.spin,
    name = props.name,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var ariaProps = typeof name === 'string' ? {
    'aria-label': name
  } : {
    'aria-hidden': true
  };
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({
    className: (0, _clsx.default)('Icon', {
      'is-spin': spin
    }, className),
    ref: ref
  }, ariaProps, other), /*#__PURE__*/_react.default.createElement("use", {
    xlinkHref: "#icon-".concat(type)
  }));
});
exports.Icon = Icon;