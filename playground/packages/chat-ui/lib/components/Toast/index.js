"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Toast", {
  enumerable: true,
  get: function get() {
    return _Toast.Toast;
  }
});
exports.toast = void 0;
var _react = _interopRequireDefault(require("react"));
var _mountComponent = require("../../utils/mountComponent");
var _Toast = require("./Toast");
function show(content, type, duration) {
  (0, _mountComponent.mountComponent)( /*#__PURE__*/_react.default.createElement(_Toast.Toast, {
    content: content,
    type: type,
    duration: duration
  }));
}
var toast = {
  show: show,
  success: function success(content, duration) {
    show(content, 'success', duration);
  },
  fail: function fail(content, duration) {
    show(content, 'error', duration);
  },
  loading: function loading(content, duration) {
    show(content, 'loading', duration);
  }
};
exports.toast = toast;