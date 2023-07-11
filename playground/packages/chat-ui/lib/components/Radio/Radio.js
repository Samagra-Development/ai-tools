"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "label", "checked", "disabled", "onChange"];
var Radio = function Radio(props) {
  var className = props.className,
    label = props.label,
    checked = props.checked,
    disabled = props.disabled,
    onChange = props.onChange,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("label", {
    className: (0, _clsx.default)('Radio', className, {
      'Radio--checked': checked,
      'Radio--disabled': disabled
    })
  }, /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({
    type: "radio",
    className: "Radio-input",
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }, other)), /*#__PURE__*/_react.default.createElement("span", {
    className: "Radio-text"
  }, label));
};
exports.Radio = Radio;