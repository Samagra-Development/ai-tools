"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// eslint-disable-next-line no-bitwise
var _default = function _default(str) {
  return str.slice((str.lastIndexOf('.') - 1 >>> 0) + 2);
};
exports.default = _default;