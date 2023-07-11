import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useLayoutEffect, useRef } from 'react';
import { ScrollView } from '../ScrollView/ScrollView';
import { QuickReply } from './QuickReply';
var QuickReplies = function QuickReplies(props) {
  var items = props.items,
    visible = props.visible,
    onClick = props.onClick,
    onScroll = props.onScroll;
  var scroller = useRef(null);
  var _useState = useState(!!onScroll),
    _useState2 = _slicedToArray(_useState, 2),
    scrollEvent = _useState2[0],
    setScrollEvent = _useState2[1];
  useLayoutEffect(function () {
    var timer;
    if (scroller.current) {
      setScrollEvent(false);
      scroller.current.scrollTo({
        x: 0,
        y: 0
      });
      timer = setTimeout(function () {
        setScrollEvent(true);
      }, 500);
    }
    return function () {
      clearTimeout(timer);
    };
  }, [items]);
  if (!items.length) return null;
  return /*#__PURE__*/React.createElement(ScrollView, {
    className: "QuickReplies",
    data: items,
    itemKey: "name",
    ref: scroller,
    "data-visible": visible,
    onScroll: scrollEvent ? onScroll : undefined,
    renderItem: function renderItem(item, index) {
      return /*#__PURE__*/React.createElement(QuickReply, {
        item: item,
        index: index,
        onClick: onClick,
        key: item.name
      });
    }
  });
};
QuickReplies.defaultProps = {
  items: [],
  visible: true
};
export default /*#__PURE__*/React.memo(QuickReplies);