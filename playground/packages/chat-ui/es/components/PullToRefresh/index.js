import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useRef, useCallback, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { setTransform } from '../../utils/style';
import { Icon } from '../Icon';
import { Flex } from '../Flex';
import { Button } from '../Button';
import canUse from '../../utils/canUse';
import smoothScroll from '../../utils/smoothScroll';
var canPassive = canUse('passiveListener');
var listenerOpts = canPassive ? {
  passive: true
} : false;
var listenerOptsWithoutPassive = canPassive ? {
  passive: false
} : false;
export var PullToRefresh = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$distance = props.distance,
    oDistance = _props$distance === void 0 ? 30 : _props$distance,
    _props$loadingDistanc = props.loadingDistance,
    loadingDistance = _props$loadingDistanc === void 0 ? 30 : _props$loadingDistanc,
    maxDistance = props.maxDistance,
    _props$distanceRatio = props.distanceRatio,
    distanceRatio = _props$distanceRatio === void 0 ? 2 : _props$distanceRatio,
    _props$loadMoreText = props.loadMoreText,
    loadMoreText = _props$loadMoreText === void 0 ? '点击加载更多' : _props$loadMoreText,
    children = props.children,
    onScroll = props.onScroll,
    onRefresh = props.onRefresh,
    _props$renderIndicato = props.renderIndicator,
    renderIndicator = _props$renderIndicato === void 0 ? function (status) {
      if (status === 'active' || status === 'loading') {
        return /*#__PURE__*/React.createElement(Icon, {
          className: "PullToRefresh-spinner",
          type: "spinner",
          spin: true
        });
      }
      return null;
    } : _props$renderIndicato;
  var wrapperRef = useRef(null);
  var contentRef = useRef(null);
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    distance = _useState2[0],
    setDistance = _useState2[1];
  var _useState3 = useState('pending'),
    _useState4 = _slicedToArray(_useState3, 2),
    status = _useState4[0],
    setStatus = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    dropped = _useState6[0],
    setDropped = _useState6[1];
  var _useState7 = useState(!props.onRefresh),
    _useState8 = _slicedToArray(_useState7, 2),
    disabled = _useState8[0],
    setDisabled = _useState8[1];
  var sharedRef = useRef({});
  var statusRef = useRef(status);
  var timer1 = useRef();
  var timer2 = useRef();
  var useFallback = !canUse('touch');
  useEffect(function () {
    statusRef.current = status;
  }, [status]);
  var setContentStyle = function setContentStyle(y) {
    var content = contentRef.current;
    if (content) {
      setTransform(content, "translate3d(0px,".concat(y, "px,0)"));
    }
  };
  var scrollTo = function scrollTo(_ref) {
    var y = _ref.y,
      _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? true : _ref$animated;
    var scroller = wrapperRef.current;
    if (!scroller) return;
    var offsetTop = y === '100%' ? scroller.scrollHeight - scroller.offsetHeight : y;
    if (animated) {
      smoothScroll({
        el: scroller,
        to: offsetTop,
        x: false
      });
    } else {
      scroller.scrollTop = offsetTop;
    }
  };
  var scrollToEnd = useCallback(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$animated = _ref2.animated,
      animated = _ref2$animated === void 0 ? true : _ref2$animated;
    scrollTo({
      y: '100%',
      animated: animated
    });
  }, []);
  var reset = useCallback(function () {
    setDistance(0);
    setStatus('pending');
    setContentStyle(0);
  }, []);
  var handleLoadMore = useCallback(function () {
    var scroller = wrapperRef.current;
    if (!scroller) return;
    setStatus('loading');
    try {
      var sh = scroller.scrollHeight;
      onRefresh().then(function (res) {
        var handleOffset = function handleOffset() {
          scrollTo({
            y: scroller.scrollHeight - sh - 50,
            animated: false
          });
        };
        clearTimeout(timer1.current);
        clearTimeout(timer2.current);
        handleOffset();
        timer1.current = setTimeout(handleOffset, 150);
        timer2.current = setTimeout(handleOffset, 250);
        reset();
        if (res && res.noMore) {
          setDisabled(true);
        }
      });
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.error(ex);
      reset();
    }
  }, [onRefresh, reset]);
  var touchStart = function touchStart(e) {
    sharedRef.current.startY = e.touches[0].clientY;
    sharedRef.current.canPull = wrapperRef.current && wrapperRef.current.scrollTop <= 0;
    if (sharedRef.current.canPull) {
      setStatus('pull');
      setDropped(false);
    }
  };
  var touchMove = useCallback(function (e) {
    var currentY = e.touches[0].clientY;
    var _sharedRef$current = sharedRef.current,
      canPull = _sharedRef$current.canPull,
      startY = _sharedRef$current.startY;
    if (!canPull || currentY < startY || statusRef.current === 'loading') return;
    var dist = (currentY - startY) / distanceRatio;
    if (maxDistance && dist > maxDistance) {
      dist = maxDistance;
    }
    if (dist > 0) {
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
      setContentStyle(dist);
      setDistance(dist);
      setStatus(dist >= oDistance ? 'active' : 'pull');
    }
  }, [distanceRatio, maxDistance, oDistance]);
  var touchEnd = useCallback(function () {
    setDropped(true);
    if (statusRef.current === 'active') {
      handleLoadMore();
    } else {
      reset();
    }
  }, [handleLoadMore, reset]);
  useEffect(function () {
    var wrapper = wrapperRef.current;
    if (!wrapper || useFallback) return;
    if (disabled) {
      wrapper.removeEventListener('touchstart', touchStart);
      wrapper.removeEventListener('touchmove', touchMove);
      wrapper.removeEventListener('touchend', touchEnd);
      wrapper.removeEventListener('touchcancel', touchEnd);
    } else {
      wrapper.addEventListener('touchstart', touchStart, listenerOpts);
      wrapper.addEventListener('touchmove', touchMove, listenerOptsWithoutPassive);
      wrapper.addEventListener('touchend', touchEnd);
      wrapper.addEventListener('touchcancel', touchEnd);
    }
  }, [disabled, touchEnd, touchMove, useFallback]);
  useEffect(function () {
    if (status === 'loading' && !useFallback) {
      setContentStyle(loadingDistance);
    }
  }, [loadingDistance, status, useFallback]);
  useImperativeHandle(ref, function () {
    return {
      scrollTo: scrollTo,
      scrollToEnd: scrollToEnd,
      wrapperRef: wrapperRef
    };
  }, [scrollToEnd]);
  return /*#__PURE__*/React.createElement("div", {
    className: "PullToRefresh",
    ref: wrapperRef,
    onScroll: onScroll
  }, /*#__PURE__*/React.createElement("div", {
    className: "PullToRefresh-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx('PullToRefresh-content', {
      'PullToRefresh-transition': dropped
    }),
    ref: contentRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "PullToRefresh-indicator"
  }, renderIndicator(status, distance)), !disabled && useFallback && /*#__PURE__*/React.createElement(Flex, {
    className: "PullToRefresh-fallback",
    center: true
  }, renderIndicator(status, oDistance), /*#__PURE__*/React.createElement(Button, {
    className: "PullToRefresh-loadMore",
    variant: "text",
    onClick: handleLoadMore
  }, loadMoreText)), React.Children.only(children))));
});