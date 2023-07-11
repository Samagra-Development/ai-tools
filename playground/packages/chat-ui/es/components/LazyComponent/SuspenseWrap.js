import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["component", "onError", "fallback"];
import React, { Suspense } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
export var SuspenseWrap = function SuspenseWrap(props) {
  var Comp = props.component,
    onError = props.onError,
    fallback = props.fallback,
    rest = _objectWithoutProperties(props, _excluded);
  return Comp ? /*#__PURE__*/React.createElement(ErrorBoundary, {
    onError: onError
  }, /*#__PURE__*/React.createElement(Suspense, {
    fallback: fallback || null
  }, /*#__PURE__*/React.createElement(Comp, rest))) : null;
};