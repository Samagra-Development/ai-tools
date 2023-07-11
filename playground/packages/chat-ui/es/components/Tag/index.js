import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["as", "className", "color", "children"];
import React from 'react';
import clsx from 'clsx';
export var Tag = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Element = _props$as === void 0 ? 'span' : _props$as,
    className = props.className,
    color = props.color,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement(Element, _extends({
    className: clsx('Tag', color && "Tag--".concat(color), className),
    ref: ref
  }, other), children);
});