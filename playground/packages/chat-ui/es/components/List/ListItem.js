import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "as", "content", "rightIcon", "children", "onClick"];
import React from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
export var ListItem = function ListItem(props) {
  var className = props.className,
    _props$as = props.as,
    Element = _props$as === void 0 ? 'div' : _props$as,
    content = props.content,
    rightIcon = props.rightIcon,
    children = props.children,
    onClick = props.onClick,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement(Element, _extends({
    className: clsx('ListItem', className),
    onClick: onClick,
    role: "listitem"
  }, other), /*#__PURE__*/React.createElement("div", {
    className: "ListItem-content"
  }, content || children), rightIcon && /*#__PURE__*/React.createElement(Icon, {
    type: rightIcon
  }));
};