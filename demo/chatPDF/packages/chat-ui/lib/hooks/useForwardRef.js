"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForwardRef;
var _react = require("react");
function useForwardRef(ref) {
  var targetRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = targetRef.current;
    }
  }, [ref]);
  return targetRef;
}