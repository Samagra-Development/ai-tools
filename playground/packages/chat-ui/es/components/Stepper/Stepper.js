import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "current", "status", "inverted", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React from 'react';
import clsx from 'clsx';
export var Stepper = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$current = props.current,
    current = _props$current === void 0 ? 0 : _props$current,
    status = props.status,
    inverted = props.inverted,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var childrenArray = React.Children.toArray(children);
  var steps = childrenArray.map(function (child, index) {
    var state = {
      index: index,
      active: false,
      completed: false,
      disabled: false
    };
    if (current === index) {
      state.active = true;
      state.status = status;
    } else if (current > index) {
      state.completed = true;
    } else {
      state.disabled = !inverted;
      state.completed = inverted;
    }
    return /*#__PURE__*/React.isValidElement(child) ? /*#__PURE__*/React.cloneElement(child, _objectSpread(_objectSpread({}, state), child.props)) : null;
  });
  return /*#__PURE__*/React.createElement("ul", _extends({
    className: clsx('Stepper', className),
    ref: ref
  }, other), steps);
});