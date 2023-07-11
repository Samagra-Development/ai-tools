"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getToBottom;
function getToBottom(el) {
  return el.scrollHeight - el.scrollTop - el.offsetHeight;
}