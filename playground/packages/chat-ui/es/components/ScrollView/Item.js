import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
var observerOptions = {
  threshold: [0, 0.1]
};
export var Item = function Item(props) {
  var item = props.item,
    effect = props.effect,
    children = props.children,
    onIntersect = props.onIntersect;
  var itemRef = useRef(null);
  useEffect(function () {
    if (!onIntersect) return undefined;
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        entry = _ref2[0];
      if (entry.intersectionRatio > 0) {
        // 根据回调返回值判断是否继续监听
        if (!onIntersect(item, entry)) {
          observer.unobserve(entry.target);
        }
      }
    }, observerOptions);
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return function () {
      observer.disconnect();
    };
  }, [item, onIntersect]);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('ScrollView-item', {
      'slide-in-right-item': effect === 'slide',
      'A-fadeIn': effect === 'fade'
    }),
    ref: itemRef
  }, children);
};