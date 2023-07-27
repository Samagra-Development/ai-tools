import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "icon", "img"];
import React from 'react';
import clsx from 'clsx';
import { Button } from '../Button';
import { Icon } from '../Icon';
export var IconButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    icon = props.icon,
    img = props.img,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement(Button, _extends({
    className: clsx('IconBtn', className),
    ref: ref
  }, other), icon && /*#__PURE__*/React.createElement(Icon, {
    type: icon
  }), !icon && img && /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: ""
  }));
});