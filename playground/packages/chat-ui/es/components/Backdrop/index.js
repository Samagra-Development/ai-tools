import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "active", "onClick"];
import React from 'react';
import clsx from 'clsx';
export var Backdrop = function Backdrop(props) {
  var className = props.className,
    active = props.active,
    onClick = props.onClick,
    rest = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('Backdrop', className, {
      active: active
    }),
    onClick: onClick,
    role: "button",
    tabIndex: -1,
    "aria-hidden": true
  }, rest));
};