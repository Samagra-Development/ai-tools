import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import { PullToRefresh } from '../PullToRefresh';
import { Message } from '../Message';
import { BackBottom } from '../BackBottom';
import canUse from '../../utils/canUse';
import throttle from '../../utils/throttle';
import getToBottom from '../../utils/getToBottom';
var listenerOpts = canUse('passiveListener') ? {
  passive: true
} : false;
function isNearBottom(el, n) {
  var offsetHeight = Math.max(el.offsetHeight, 600);
  return getToBottom(el) < offsetHeight * n;
}
export var MessageContainer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var messages = props.messages,
    loadMoreText = props.loadMoreText,
    onRefresh = props.onRefresh,
    onScroll = props.onScroll,
    renderBeforeMessageList = props.renderBeforeMessageList,
    renderMessageContent = props.renderMessageContent,
    onBackBottomShow = props.onBackBottomShow,
    onBackBottomClick = props.onBackBottomClick;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showBackBottom = _useState2[0],
    setShowBackBottom = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    newCount = _useState4[0],
    setNewCount = _useState4[1];
  var showBackBottomtRef = useRef(showBackBottom);
  var newCountRef = useRef(newCount);
  var messagesRef = useRef(null);
  var scrollerRef = useRef(null);
  var lastMessage = messages[messages.length - 1];
  var clearBackBottom = function clearBackBottom() {
    setNewCount(0);
    setShowBackBottom(false);
  };
  var scrollToEnd = useCallback(function (opts) {
    if (scrollerRef.current) {
      if (!showBackBottomtRef.current || opts && opts.force) {
        scrollerRef.current.scrollToEnd(opts);
        if (showBackBottomtRef.current) {
          clearBackBottom();
        }
      }
    }
  }, []);
  var handleBackBottomClick = function handleBackBottomClick() {
    scrollToEnd({
      animated: false,
      force: true
    });
    // setNewCount(0);
    // setShowBackBottom(false);

    if (onBackBottomClick) {
      onBackBottomClick();
    }
  };
  var checkShowBottomRef = useRef(throttle(function (el) {
    if (isNearBottom(el, 3)) {
      if (newCountRef.current) {
        // 如果有新消息，离底部0.5屏-隐藏提示
        if (isNearBottom(el, 0.5)) {
          // setNewCount(0);
          // setShowBackBottom(false);
          clearBackBottom();
        }
      } else {
        setShowBackBottom(false);
      }
    } else {
      // 3屏+显示回到底部
      setShowBackBottom(true);
    }
  }));
  var handleScroll = function handleScroll(e) {
    checkShowBottomRef.current(e.target);
    if (onScroll) {
      onScroll(e);
    }
  };
  useEffect(function () {
    newCountRef.current = newCount;
  }, [newCount]);
  useEffect(function () {
    showBackBottomtRef.current = showBackBottom;
  }, [showBackBottom]);
  useEffect(function () {
    var scroller = scrollerRef.current;
    var wrapper = scroller && scroller.wrapperRef.current;
    if (!wrapper || !lastMessage || lastMessage.position === 'pop') {
      return;
    }
    if (lastMessage.position === 'right') {
      // 自己发的消息，强制滚动到底部
      scrollToEnd({
        force: true
      });
    } else if (isNearBottom(wrapper, 2)) {
      var animated = !!wrapper.scrollTop;
      scrollToEnd({
        animated: animated,
        force: true
      });
    } else {
      setNewCount(function (c) {
        return c + 1;
      });
      setShowBackBottom(true);
    }
  }, [lastMessage, scrollToEnd]);
  useEffect(function () {
    var wrapper = messagesRef.current;
    var needBlur = false;
    var startY = 0;
    function reset() {
      needBlur = false;
      startY = 0;
    }
    function touchStart(e) {
      var _document = document,
        activeElement = _document.activeElement;
      if (activeElement && activeElement.nodeName === 'TEXTAREA') {
        needBlur = true;
        startY = e.touches[0].clientY;
      }
    }
    function touchMove(e) {
      if (needBlur && Math.abs(e.touches[0].clientY - startY) > 20) {
        document.activeElement.blur();
        reset();
      }
    }
    wrapper.addEventListener('touchstart', touchStart, listenerOpts);
    wrapper.addEventListener('touchmove', touchMove, listenerOpts);
    wrapper.addEventListener('touchend', reset);
    wrapper.addEventListener('touchcancel', reset);
    return function () {
      wrapper.removeEventListener('touchstart', touchStart);
      wrapper.removeEventListener('touchmove', touchMove);
      wrapper.removeEventListener('touchend', reset);
      wrapper.removeEventListener('touchcancel', reset);
    };
  }, []);
  useImperativeHandle(ref, function () {
    return {
      ref: messagesRef,
      scrollToEnd: scrollToEnd
    };
  }, [scrollToEnd]);
  return /*#__PURE__*/React.createElement("div", {
    className: "MessageContainer",
    ref: messagesRef,
    tabIndex: -1
  }, renderBeforeMessageList && renderBeforeMessageList(), /*#__PURE__*/React.createElement(PullToRefresh, {
    onRefresh: onRefresh,
    onScroll: handleScroll,
    loadMoreText: loadMoreText,
    ref: scrollerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "MessageList"
  }, messages.map(function (msg) {
    return /*#__PURE__*/React.createElement(Message, _extends({}, msg, {
      renderMessageContent: renderMessageContent,
      key: msg._id
    }));
  }))), showBackBottom && /*#__PURE__*/React.createElement(BackBottom, {
    count: newCount,
    onClick: handleBackBottomClick,
    onDidMount: onBackBottomShow
  }));
});