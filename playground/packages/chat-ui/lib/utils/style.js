"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransition = exports.setTransform = void 0;
/* eslint-disable no-param-reassign */
var setTransform = function setTransform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
};
exports.setTransform = setTransform;
var setTransition = function setTransition(el, value) {
  el.style.transition = value;
  el.style.webkitTransition = value;
};
exports.setTransition = setTransition;