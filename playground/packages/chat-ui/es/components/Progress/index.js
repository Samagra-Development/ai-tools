import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "value", "status", "children"];
import React from 'react';
import clsx from 'clsx';
export var Progress = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    value = props.value,
    status = props.status,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('Progress', status && "Progress--".concat(status), className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: "Progress-bar",
    role: "progressbar",
    style: {
      width: "".concat(value, "%")
    },
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, children));
});