import React from 'react';
import clsx from 'clsx';
export var Avatar = function Avatar(props) {
  var className = props.className,
    src = props.src,
    alt = props.alt,
    url = props.url,
    _props$size = props.size,
    size = _props$size === void 0 ? 'md' : _props$size,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'circle' : _props$shape,
    children = props.children;
  var Element = url ? 'a' : 'span';
  return /*#__PURE__*/React.createElement(Element, {
    className: clsx('Avatar', "Avatar--".concat(size), "Avatar--".concat(shape), className),
    href: url
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : children);
};