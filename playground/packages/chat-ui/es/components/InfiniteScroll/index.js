import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "disabled", "distance", "children", "onLoadMore", "onScroll"];
import React from 'react';
import clsx from 'clsx';
import useForwardRef from '../../hooks/useForwardRef';
import getToBottom from '../../utils/getToBottom';
export var InfiniteScroll = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    disabled = props.disabled,
    _props$distance = props.distance,
    distance = _props$distance === void 0 ? 0 : _props$distance,
    children = props.children,
    onLoadMore = props.onLoadMore,
    onScroll = props.onScroll,
    other = _objectWithoutProperties(props, _excluded);
  var wrapperRef = useForwardRef(ref);
  function handleScroll(e) {
    if (onScroll) {
      onScroll(e);
    }
    var el = wrapperRef.current;
    if (!el) return;
    var nearBottom = getToBottom(el) <= distance;
    if (nearBottom) {
      onLoadMore();
    }
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('InfiniteScroll', className),
    role: "feed",
    onScroll: !disabled ? handleScroll : undefined,
    ref: wrapperRef
  }, other), children);
});