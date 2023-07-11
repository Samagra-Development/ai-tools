"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = exports.Form = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "theme", "children"];
var ThemeContext = /*#__PURE__*/_react.default.createContext('');
exports.ThemeContext = ThemeContext;
var Form = function Form(props) {
  var className = props.className,
    _props$theme = props.theme,
    theme = _props$theme === void 0 ? '' : _props$theme,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/_react.default.createElement("form", (0, _extends2.default)({
    className: (0, _clsx.default)('Form', {
      'is-light': theme === 'light'
    }, className)
  }, other), children));
};
exports.Form = Form;