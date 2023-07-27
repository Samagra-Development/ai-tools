"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Radio = require("./Radio");
var RadioGroup = function RadioGroup(props) {
  var className = props.className,
    options = props.options,
    value = props.value,
    name = props.name,
    disabled = props.disabled,
    block = props.block,
    _onChange = props.onChange;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('RadioGroup', {
      'RadioGroup--block': block
    }, className)
  }, options.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Radio.Radio, {
      label: item.label || item.value,
      value: item.value,
      name: name,
      checked: value === item.value,
      disabled: 'disabled' in item ? item.disabled : disabled,
      onChange: function onChange(e) {
        _onChange(item.value, e);
      },
      key: item.value
    });
  }));
};
exports.RadioGroup = RadioGroup;