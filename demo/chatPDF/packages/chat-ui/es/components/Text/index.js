import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["as", "className", "align", "breakWord", "truncate", "children"];
import React from 'react';
import clsx from 'clsx';
export var Text = function Text(props) {
  var _props$as = props.as,
    Element = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    align = props.align,
    breakWord = props.breakWord,
    truncate = props.truncate,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var ellipsis = Number.isInteger(truncate);
  var cls = clsx(align && "Text--".concat(align), {
    'Text--break': breakWord,
    'Text--truncate': truncate === true,
    'Text--ellipsis': ellipsis
  }, className);
  var style = ellipsis ? {
    WebkitLineClamp: truncate
  } : null;
  return /*#__PURE__*/React.createElement(Element, _extends({
    className: cls,
    style: style
  }, other), children);
};