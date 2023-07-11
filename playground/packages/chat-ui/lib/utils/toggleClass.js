"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// IE 不支持 toggle 第二个参数
var _default = function _default(className, flag) {
  var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;
  el.classList[flag ? 'add' : 'remove'](className);
};
exports.default = _default;