import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
function renderIcon(type) {
  switch (type) {
    case 'success':
      return /*#__PURE__*/React.createElement(Icon, {
        type: "check-circle"
      });
    case 'error':
      return /*#__PURE__*/React.createElement(Icon, {
        type: "warning-circle"
      });
    case 'loading':
      return /*#__PURE__*/React.createElement(Icon, {
        type: "spinner",
        spin: true
      });
    default:
      return null;
  }
}
export var Toast = function Toast(props) {
  var content = props.content,
    type = props.type,
    _props$duration = props.duration,
    duration = _props$duration === void 0 ? 2000 : _props$duration,
    onUnmount = props.onUnmount;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  useEffect(function () {
    setShow(true);
    if (duration !== -1) {
      setTimeout(function () {
        setShow(false);
      }, duration);
      setTimeout(function () {
        if (onUnmount) {
          onUnmount();
        }
      }, duration + 300);
    }
  }, [duration, onUnmount]);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Toast', {
      show: show
    }),
    "data-type": type,
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Toast-content",
    role: "presentation"
  }, renderIcon(type), /*#__PURE__*/React.createElement("p", {
    className: "Toast-message"
  }, content)));
};