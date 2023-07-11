import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "fullWidth", "scrollX", "effect", "data", "itemKey", "renderItem", "onIntersect", "onScroll", "children"];
import React, { useRef, useImperativeHandle, useCallback } from 'react';
import clsx from 'clsx';
import { Item } from './Item';
import { IconButton } from '../IconButton';
import canUse from '../../utils/canUse';
var hasControls = !canUse('touch');
export var ScrollView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    fullWidth = props.fullWidth,
    _props$scrollX = props.scrollX,
    scrollX = _props$scrollX === void 0 ? true : _props$scrollX,
    _props$effect = props.effect,
    effect = _props$effect === void 0 ? 'slide' : _props$effect,
    data = props.data,
    itemKey = props.itemKey,
    renderItem = props.renderItem,
    onIntersect = props.onIntersect,
    onScroll = props.onScroll,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var scrollerRef = useRef(null);
  function handlePrev() {
    var el = scrollerRef.current;
    el.scrollLeft -= el.offsetWidth;
  }
  function handleNext() {
    var el = scrollerRef.current;
    el.scrollLeft += el.offsetWidth;
  }
  var getItemKey = useCallback(function (item, index) {
    var key;
    if (itemKey) {
      key = typeof itemKey === 'function' ? itemKey(item, index) : item[itemKey];
    }
    return key || index;
  }, [itemKey]);
  useImperativeHandle(ref, function () {
    return {
      scrollTo: function scrollTo(_ref) {
        var x = _ref.x,
          y = _ref.y;
        if (x != null) {
          scrollerRef.current.scrollLeft = x;
        }
        if (y != null) {
          scrollerRef.current.scrollTop = y;
        }
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('ScrollView', {
      'ScrollView--fullWidth': fullWidth,
      'ScrollView--x': scrollX,
      'ScrollView--hasControls': hasControls
    }, className),
    ref: ref
  }, other), hasControls && /*#__PURE__*/React.createElement(IconButton, {
    className: "ScrollView-control",
    icon: "chevron-left",
    "aria-label": "Previous",
    onClick: handlePrev
  }), /*#__PURE__*/React.createElement("div", {
    className: "ScrollView-scroller",
    ref: scrollerRef,
    onScroll: onScroll
  }, /*#__PURE__*/React.createElement("div", {
    className: "ScrollView-inner"
  }, data.map(function (item, i) {
    return /*#__PURE__*/React.createElement(Item, {
      item: item,
      effect: item.effect || effect,
      onIntersect: onIntersect,
      key: getItemKey(item, i)
    }, renderItem(item, i));
  }), children ? /*#__PURE__*/React.createElement(Item, {
    item: {},
    effect: effect,
    onIntersect: onIntersect
  }, children) : null)), hasControls && /*#__PURE__*/React.createElement(IconButton, {
    className: "ScrollView-control",
    icon: "chevron-right",
    "aria-label": "Next",
    onClick: handleNext
  }));
});