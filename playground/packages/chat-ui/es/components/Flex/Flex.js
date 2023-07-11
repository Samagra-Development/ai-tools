import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["as", "className", "inline", "center", "direction", "wrap", "justifyContent", "justify", "alignItems", "align", "children"];
import React from 'react';
import clsx from 'clsx';
var mapDirection = {
  row: 'Flex--d-r',
  'row-reverse': 'Flex--d-rr',
  column: 'Flex--d-c',
  'column-reverse': 'Flex--d-cr'
};
var mapWrap = {
  nowrap: 'Flex--w-n',
  wrap: 'Flex--w-w',
  'wrap-reverse': 'Flex--w-wr'
};
var mapJustify = {
  'flex-start': 'Flex--jc-fs',
  'flex-end': 'Flex--jc-fe',
  center: 'Flex--jc-c',
  'space-between': 'Flex--jc-sb',
  'space-around': 'Flex--jc-sa'
};
var mapAlign = {
  'flex-start': 'Flex--ai-fs',
  'flex-end': 'Flex--ai-fe',
  center: 'Flex--ai-c'
};
export var Flex = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Element = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    inline = props.inline,
    center = props.center,
    direction = props.direction,
    wrap = props.wrap,
    justifyContent = props.justifyContent,
    _props$justify = props.justify,
    justify = _props$justify === void 0 ? justifyContent : _props$justify,
    alignItems = props.alignItems,
    _props$align = props.align,
    align = _props$align === void 0 ? alignItems : _props$align,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement(Element, _extends({
    className: clsx('Flex', direction && mapDirection[direction], justify && mapJustify[justify], align && mapAlign[align], wrap && mapWrap[wrap], {
      'Flex--inline': inline,
      'Flex--center': center
    }, className),
    ref: ref
  }, other), children);
});