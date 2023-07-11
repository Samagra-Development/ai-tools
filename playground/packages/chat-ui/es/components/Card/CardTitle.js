import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "title", "subtitle", "center", "children"];
import React from 'react';
import clsx from 'clsx';
export var CardTitle = function CardTitle(props) {
  var className = props.className,
    title = props.title,
    subtitle = props.subtitle,
    center = props.center,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('CardTitle', {
      'CardTitle--center': center
    }, className)
  }, other), title && /*#__PURE__*/React.createElement("h5", {
    className: "CardTitle-title"
  }, title), children && typeof children === 'string' && /*#__PURE__*/React.createElement("h5", {
    className: "CardTitle-title"
  }, children), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "CardTitle-subtitle"
  }, subtitle), children && typeof children !== 'string' && children);
};