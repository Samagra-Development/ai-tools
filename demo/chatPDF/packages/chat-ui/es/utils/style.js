/* eslint-disable no-param-reassign */
export var setTransform = function setTransform(el, value) {
  el.style.transform = value;
  el.style.webkitTransform = value;
};
export var setTransition = function setTransition(el, value) {
  el.style.transition = value;
  el.style.webkitTransition = value;
};