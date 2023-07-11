"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;
function throttle(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var ready = true;
  return function () {
    if (!ready) {
      return;
    }
    ready = false;
    fn.apply(void 0, arguments);
    setTimeout(function () {
      ready = true;
    }, delay);
  };
}