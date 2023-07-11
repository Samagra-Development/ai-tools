import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["code", "fallback", "onLoad", "onError"],
  _excluded2 = ["component", "code", "onLoad"];
import React from 'react';
import { SuspenseWrap } from './SuspenseWrap';
import { useComponents } from '../ComponentsProvider/useComponents';
export var LazyComponentWithCode = function LazyComponentWithCode(props) {
  var code = props.code,
    fallback = props.fallback,
    onLoad = props.onLoad,
    onError = props.onError,
    rest = _objectWithoutProperties(props, _excluded);
  var _useComponents = useComponents(),
    getComponent = _useComponents.getComponent;
  var Comp = getComponent(code, function (res) {
    if ('async' in res && onLoad) {
      onLoad(res);
    } else if ('errCode' in res && onError) {
      onError(new Error(res.errCode));
    }
  });
  return /*#__PURE__*/React.createElement(SuspenseWrap, _extends({
    component: Comp,
    onError: onError,
    fallback: fallback
  }, rest));
};
export var LazyComponent = function LazyComponent(props) {
  var component = props.component,
    code = props.code,
    onLoad = props.onLoad,
    rest = _objectWithoutProperties(props, _excluded2);
  if (component) {
    if (onLoad) {
      onLoad({
        async: false,
        component: component
      });
    }
    return /*#__PURE__*/React.createElement(SuspenseWrap, _extends({
      component: component
    }, rest));
  }
  return /*#__PURE__*/React.createElement(LazyComponentWithCode, _extends({
    code: code,
    onLoad: onLoad
  }, rest));
};
export default LazyComponent;