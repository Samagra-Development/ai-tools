import React from 'react';
import clsx from 'clsx';
import { Radio } from './Radio';
export var RadioGroup = function RadioGroup(props) {
  var className = props.className,
    options = props.options,
    value = props.value,
    name = props.name,
    disabled = props.disabled,
    block = props.block,
    _onChange = props.onChange;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('RadioGroup', {
      'RadioGroup--block': block
    }, className)
  }, options.map(function (item) {
    return /*#__PURE__*/React.createElement(Radio, {
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