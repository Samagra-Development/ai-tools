import React from 'react';
import clsx from 'clsx';
import { Checkbox } from './Checkbox';
export var CheckboxGroup = function CheckboxGroup(props) {
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
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('CheckboxGroup', {
      'CheckboxGroup--block': block
    }, className)
  }, options.map(function (item) {
    return /*#__PURE__*/React.createElement(Checkbox, {
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