"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function renderIcon(type) {
  switch (type) {
    case 'success':
      return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        type: "check-circle"
      });
    case 'error':
      return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        type: "warning-circle"
      });
    case 'loading':
      return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        type: "spinner",
        spin: true
      });
    default:
      return null;
  }
}
var Toast = function Toast(props) {
  var content = props.content,
    type = props.type,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 2000 : _props$duration,
    onUnmount = props.onUnmount;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  (0, _react.useEffect)(function () {
    setShow(true);
    if (duration !== -1) {
      setTimeout(function () {
        setShow(false);
      }, duration);
      setTimeout(function () {
        if (onUnmount) {
          onUnmount();
        }
      }, duration + 300);
    }
  }, [duration, onUnmount]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Toast', {
      show: show
    }),
    "data-type": type,
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Toast-content",
    role: "presentation"
  }, renderIcon(type), /*#__PURE__*/_react.default.createElement("p", {
    className: "Toast-message"
  }, content)));
};
exports.Toast = Toast;