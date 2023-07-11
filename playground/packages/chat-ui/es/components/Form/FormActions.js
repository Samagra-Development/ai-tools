import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children"];
import React from 'react';
import clsx from 'clsx';
export var FormActions = function FormActions(props) {
  var children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('FormActions')
  }, other), children);
};