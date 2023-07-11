"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
var _excluded = ["className", "active", "completed", "disabled", "status", "index", "title", "subTitle", "desc", "children"];
function renderDot(status) {
  if (status) {
    var iconMap = {
      success: 'check-circle-fill',
      fail: 'warning-circle-fill',
      abort: 'dash-circle-fill'
    };
    return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      type: iconMap[status]
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Step-dot"
  });
}
var Step = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    _props$active = props.active,
    active = _props$active === void 0 ? false : _props$active,
    _props$completed = props.completed,
    completed = _props$completed === void 0 ? false : _props$completed,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    status = props.status,
    index = props.index,
    title = props.title,
    subTitle = props.subTitle,
    desc = props.desc,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
    className: (0, _clsx.default)('Step', {
      'Step--active': active,
      'Step--completed': completed,
      'Step--disabled': disabled
    }, className),
    ref: ref,
    "data-status": status
  }, other), /*#__PURE__*/_react.default.createElement("div", {
    className: "Step-icon"
  }, renderDot(status)), /*#__PURE__*/_react.default.createElement("div", {
    className: "Step-line"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "Step-content"
  }, title && /*#__PURE__*/_react.default.createElement("div", {
    className: "Step-title"
  }, title && /*#__PURE__*/_react.default.createElement("span", null, title), subTitle && /*#__PURE__*/_react.default.createElement("small", null, subTitle)), desc && /*#__PURE__*/_react.default.createElement("div", {
    className: "Step-desc"
  }, desc), children));
});
exports.Step = Step;