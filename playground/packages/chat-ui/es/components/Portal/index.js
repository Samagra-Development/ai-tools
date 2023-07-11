import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
function getEl(el) {
  if (!el) return null;
  if (el instanceof Element) {
    return el;
  }
  return typeof el === 'function' ? el() : el.current || el;
}
export var Portal = function Portal(props) {
  var children = props.children,
    _props$container = props.container,
    container = _props$container === void 0 ? document.body : _props$container,
    onRendered = props.onRendered;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    mountNode = _useState2[0],
    setMountNode = _useState2[1];
  useEffect(function () {
    setMountNode(getEl(container));
  }, [container]);
  useLayoutEffect(function () {
    if (onRendered && mountNode) {
      onRendered();
    }
  }, [mountNode, onRendered]);
  return mountNode ? /*#__PURE__*/createPortal(children, mountNode) : mountNode;
};