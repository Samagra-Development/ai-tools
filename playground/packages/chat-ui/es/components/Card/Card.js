import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "size", "fluid", "children"];
import React from 'react';
import clsx from 'clsx';
export var Card = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    size = props.size,
    fluid = props.fluid,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('Card', size && "Card--".concat(size), {
      'Card--fluid': fluid
    }, className),
    "data-fluid": fluid
  }, other, {
    ref: ref
  }), children);
});