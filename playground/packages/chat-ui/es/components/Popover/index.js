import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import useMount from '../../hooks/useMount';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowResize from '../../hooks/useWindowResize';
export var Popover = function Popover(props) {
  var className = props.className,
    active = props.active,
    target = props.target,
    children = props.children,
    onClose = props.onClose;
  var wrapper = useClickOutside(onClose, 'mousedown');
  var _useMount = useMount({
      active: active,
      ref: wrapper
    }),
    didMount = _useMount.didMount,
    isShow = _useMount.isShow;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];
  var updatePos = useCallback(function () {
    if (!wrapper.current) return;
    var targetRect = target.getBoundingClientRect();
    var rect = wrapper.current.getBoundingClientRect();
    setStyle({
      top: "".concat(targetRect.top - rect.height, "px"),
      left: "".concat(targetRect.left, "px")
    });
  }, [target, wrapper]);
  useEffect(function () {
    if (wrapper.current) {
      wrapper.current.focus();
      updatePos();
    }
  }, [didMount, updatePos, wrapper]);
  useWindowResize(updatePos);
  if (!didMount) return null;
  return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", {
    className: clsx('Popover', className, {
      active: isShow
    }),
    ref: wrapper,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "Popover-body"
  }, children), /*#__PURE__*/React.createElement("svg", {
    className: "Popover-arrow",
    viewBox: "0 0 9 5"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0,0 5,5, 9,0"
  }))), document.body);
};