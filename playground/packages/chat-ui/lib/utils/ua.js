"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIOSMajorVersion = getIOSMajorVersion;
exports.isIOS = isIOS;
exports.isSafari = isSafari;
exports.isSafariOrIOS11 = isSafariOrIOS11;
var ua = navigator.userAgent;
function isIOS() {
  return /iPad|iPhone|iPod/.test(ua);
}
function isSafari() {
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(ua);
}
function isSafariOrIOS11() {
  return ua.includes('Safari/') || /OS 11_[0-3]\D/.test(ua);
}
function getIOSMajorVersion() {
  var v = ua.match(/OS (\d+)_/);
  return v ? +v[1] : 0;
}