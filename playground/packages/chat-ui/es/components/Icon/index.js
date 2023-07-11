import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["type", "className", "spin", "name"];
import React from 'react';
import clsx from 'clsx';
export var Icon = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var type = props.type,
    className = props.className,
    spin = props.spin,
    name = props.name,
    other = _objectWithoutProperties(props, _excluded);
  var ariaProps = typeof name === 'string' ? {
    'aria-label': name
  } : {
    'aria-hidden': true
  };
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: clsx('Icon', {
      'is-spin': spin
    }, className),
    ref: ref
  }, ariaProps, other), /*#__PURE__*/React.createElement("use", {
    xlinkHref: "#icon-".concat(type)
  }));
});