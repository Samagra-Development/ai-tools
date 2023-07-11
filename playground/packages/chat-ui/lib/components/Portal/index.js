"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Portal = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _reactDom = require("react-dom");
function getEl(el) {
  if (!el) return null;
  if (el instanceof Element) {
    return el;
  }
  return typeof el === 'function' ? el() : el.current || el;
}
var Portal = function Portal(props) {
  var children = props.children,
    _props$container = props.container,
    container = _props$container === void 0 ? document.body : _props$container,
    onRendered = props.onRendered;
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    mountNode = _useState2[0],
    setMountNode = _useState2[1];
  (0, _react.useEffect)(function () {
    setMountNode(getEl(container));
  }, [container]);
  (0, _react.useLayoutEffect)(function () {
    if (onRendered && mountNode) {
      onRendered();
    }
  }, [mountNode, onRendered]);
  return mountNode ? /*#__PURE__*/(0, _reactDom.createPortal)(children, mountNode) : mountNode;
};
exports.Portal = Portal;