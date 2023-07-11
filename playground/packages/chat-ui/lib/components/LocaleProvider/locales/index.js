"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ar_EG = _interopRequireDefault(require("./ar_EG"));
var _en_US = _interopRequireDefault(require("./en_US"));
var _fr_FR = _interopRequireDefault(require("./fr_FR"));
var _zh_CN = _interopRequireDefault(require("./zh_CN"));
var _default = {
  'ar-EG': _ar_EG.default,
  // 阿拉伯
  'fr-FR': _fr_FR.default,
  // 法语
  'en-US': _en_US.default,
  // 英语（美式）
  'zh-CN': _zh_CN.default // 简体中文
};
exports.default = _default;