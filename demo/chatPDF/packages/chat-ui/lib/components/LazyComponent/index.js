"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LazyComponentWithCode = exports.LazyComponent = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _SuspenseWrap = require("./SuspenseWrap");
var _useComponents2 = require("../ComponentsProvider/useComponents");
var _excluded = ["code", "fallback", "onLoad", "onError"],
  _excluded2 = ["component", "code", "onLoad"];
var LazyComponentWithCode = function LazyComponentWithCode(props) {
  var code = props.code,
    fallback = props.fallback,
    onLoad = props.onLoad,
    onError = props.onError,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded);
  var _useComponents = (0, _useComponents2.useComponents)(),
    getComponent = _useComponents.getComponent;
  var Comp = getComponent(code, function (res) {
    if ('async' in res && onLoad) {
      onLoad(res);
    } else if ('errCode' in res && onError) {
      onError(new Error(res.errCode));
    }
  });
  return /*#__PURE__*/_react.default.createElement(_SuspenseWrap.SuspenseWrap, (0, _extends2.default)({
    component: Comp,
    onError: onError,
    fallback: fallback
  }, rest));
};
exports.LazyComponentWithCode = LazyComponentWithCode;
var LazyComponent = function LazyComponent(props) {
  var component = props.component,
    code = props.code,
    onLoad = props.onLoad,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded2);
  if (component) {
    if (onLoad) {
      onLoad({
        async: false,
        component: component
      });
    }
    return /*#__PURE__*/_react.default.createElement(_SuspenseWrap.SuspenseWrap, (0, _extends2.default)({
      component: component
    }, rest));
  }
  return /*#__PURE__*/_react.default.createElement(LazyComponentWithCode, (0, _extends2.default)({
    code: code,
    onLoad: onLoad
  }, rest));
};
exports.LazyComponent = LazyComponent;
var _default = LazyComponent;
exports.default = _default;