import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "theme", "children"];
import React from 'react';
import clsx from 'clsx';
export var ThemeContext = /*#__PURE__*/React.createContext('');
export var Form = function Form(props) {
  var className = props.className,
    _props$theme = props.theme,
    theme = _props$theme === void 0 ? '' : _props$theme,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/React.createElement("form", _extends({
    className: clsx('Form', {
      'is-light': theme === 'light'
    }, className)
  }, other), children));
};