import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "aspectRatio", "color", "image", "children"];
import React from 'react';
import clsx from 'clsx';
import { Flex } from '../Flex';
export var CardMedia = function CardMedia(props) {
  var className = props.className,
    _props$aspectRatio = props.aspectRatio,
    aspectRatio = _props$aspectRatio === void 0 ? 'square' : _props$aspectRatio,
    color = props.color,
    image = props.image,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var bgStyle = {
    backgroundColor: color || undefined,
    backgroundImage: typeof image === 'string' ? "url('".concat(image, "')") : undefined
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('CardMedia', {
      'CardMedia--wide': aspectRatio === 'wide',
      'CardMedia--square': aspectRatio === 'square'
    }, className),
    style: bgStyle
  }, other), children && /*#__PURE__*/React.createElement(Flex, {
    className: "CardMedia-content",
    direction: "column",
    center: true
  }, children));
};