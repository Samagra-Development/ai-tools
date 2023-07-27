import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["children", "onClick", "mouseEvent"];
import React, { useEffect, useRef } from 'react';
var doc = document;
var html = doc.documentElement;
export var ClickOutside = function ClickOutside(props) {
  var children = props.children,
    onClick = props.onClick,
    _props$mouseEvent = props.mouseEvent,
    mouseEvent = _props$mouseEvent === void 0 ? 'mouseup' : _props$mouseEvent,
    others = _objectWithoutProperties(props, _excluded);
  var wrapper = useRef(null);
  function handleClick(e) {
    if (!wrapper.current) return;
    if (html.contains(e.target) && !wrapper.current.contains(e.target)) {
      onClick(e);
    }
  }
  useEffect(function () {
    if (mouseEvent) {
      doc.addEventListener(mouseEvent, handleClick);
    }
    return function () {
      doc.removeEventListener(mouseEvent, handleClick);
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: wrapper
  }, others), children);
};