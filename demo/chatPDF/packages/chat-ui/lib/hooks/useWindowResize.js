"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useWindowResize;
var _react = require("react");
function useWindowResize(handler) {
  var running = (0, _react.useRef)(false);
  (0, _react.useEffect)(function () {
    function runCallback() {
      handler();
      running.current = false;
    }
    function resizeThrottler() {
      if (!running.current) {
        running.current = true;
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(runCallback);
        } else {
          setTimeout(runCallback, 66);
        }
      }
    }
    window.addEventListener('resize', resizeThrottler);
    return function () {
      window.removeEventListener('resize', resizeThrottler);
    };
  }, [handler]);
}