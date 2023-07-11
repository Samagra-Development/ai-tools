"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
var k = 1024;
var _default = function _default(bytes, decimals) {
  if (bytes < 1) {
    return "".concat(bytes, " ").concat(UNITS[0]);
  }
  var dm = decimals || 2;
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), " ").concat(UNITS[i]);
};
exports.default = _default;