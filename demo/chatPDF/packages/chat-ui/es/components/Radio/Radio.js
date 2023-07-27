import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "label", "checked", "disabled", "onChange"];
import React from 'react';
import clsx from 'clsx';
export var Radio = function Radio(props) {
  var className = props.className,
    label = props.label,
    checked = props.checked,
    disabled = props.disabled,
    onChange = props.onChange,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("label", {
    className: clsx('Radio', className, {
      'Radio--checked': checked,
      'Radio--disabled': disabled
    })
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    className: "Radio-input",
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }, other)), /*#__PURE__*/React.createElement("span", {
    className: "Radio-text"
  }, label));
};