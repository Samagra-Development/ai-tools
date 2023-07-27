"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stepper = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "current", "status", "inverted", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Stepper = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    _props$current = props.current,
    current = _props$current === void 0 ? 0 : _props$current,
    status = props.status,
    inverted = props.inverted,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var childrenArray = _react.default.Children.toArray(children);
  var steps = childrenArray.map(function (child, index) {
    var state = {
      index: index,
      active: false,
      completed: false,
      disabled: false
    };
    if (current === index) {
      state.active = true;
      state.status = status;
    } else if (current > index) {
      state.completed = true;
    } else {
      state.disabled = !inverted;
      state.completed = inverted;
    }
    return /*#__PURE__*/_react.default.isValidElement(child) ? /*#__PURE__*/_react.default.cloneElement(child, _objectSpread(_objectSpread({}, state), child.props)) : null;
  });
  return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
    className: (0, _clsx.default)('Stepper', className),
    ref: ref
  }, other), steps);
});
exports.Stepper = Stepper;