"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Checkbox = require("./Checkbox");
var CheckboxGroup = function CheckboxGroup(props) {
  var className = props.className,
    options = props.options,
    value = props.value,
    name = props.name,
    disabled = props.disabled,
    block = props.block,
    onChange = props.onChange;
  function handleChange(val, e) {
    var newValue = e.target.checked ? value.concat(val) : value.filter(function (item) {
      return item !== val;
    });
    onChange(newValue, e);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('CheckboxGroup', {
      'CheckboxGroup--block': block
    }, className)
  }, options.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Checkbox.Checkbox, {
      label: item.label || item.value,
      value: item.value,
      name: name,
      checked: value.includes(item.value),
      disabled: 'disabled' in item ? item.disabled : disabled,
      onChange: function onChange(e) {
        handleChange(item.value, e);
      },
      key: item.value
    });
  }));
};
exports.CheckboxGroup = CheckboxGroup;