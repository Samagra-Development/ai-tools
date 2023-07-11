import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "className", "direction"];
import React from 'react';
import clsx from 'clsx';
export var CardActions = function CardActions(props) {
  var children = props.children,
    className = props.className,
    direction = props.direction,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('CardActions', className, direction && "CardActions--".concat(direction))
  }, other), children);
};