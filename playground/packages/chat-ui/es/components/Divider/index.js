import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "position", "children"];
import React from 'react';
import clsx from 'clsx';
export var Divider = function Divider(props) {
  var className = props.className,
    _props$position = props.position,
    position = _props$position === void 0 ? 'center' : _props$position,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('Divider', !!children && "Divider--text-".concat(position), className),
    role: "separator"
  }, other), children);
};