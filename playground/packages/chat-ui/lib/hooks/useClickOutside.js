"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useClickOutside;
var _react = require("react");
function useClickOutside(handler) {
  var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var listener = function listener(e) {
      var targetElement = ref.current;
      if (!targetElement || targetElement.contains(e.target)) {
        return;
      }
      if (handler) {
        handler(e);
      }
    };
    document.addEventListener(eventName, listener);
    return function () {
      document.removeEventListener(eventName, listener);
    };
  }, [eventName, handler]);
  return ref;
}