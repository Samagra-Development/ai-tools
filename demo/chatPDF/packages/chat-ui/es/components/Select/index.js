import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "placeholder", "variant", "children"];
import React from 'react';
import clsx from 'clsx';
export var Select = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
    placeholder = _ref.placeholder,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'outline' : _ref$variant,
    children = _ref.children,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("select", _extends({
    className: clsx('Input Select', "Input--".concat(variant), className)
  }, rest, {
    ref: ref
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), children);
});