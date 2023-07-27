import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
export var MessageStatus = function MessageStatus(_ref) {
  var status = _ref.status,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 1500 : _ref$delay,
    _ref$maxDelay = _ref.maxDelay,
    maxDelay = _ref$maxDelay === void 0 ? 5000 : _ref$maxDelay,
    onRetry = _ref.onRetry,
    onChange = _ref.onChange;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    type = _useState2[0],
    setType = _useState2[1];
  var loadingTimerRef = useRef();
  var failTimerRef = useRef();
  var doTimeout = useCallback(function () {
    loadingTimerRef.current = setTimeout(function () {
      setType('loading');
    }, delay);
    failTimerRef.current = setTimeout(function () {
      setType('fail');
    }, maxDelay);
  }, [delay, maxDelay]);
  function clear() {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }
    if (failTimerRef.current) {
      clearTimeout(failTimerRef.current);
    }
  }
  useEffect(function () {
    clear();
    if (status === 'pending') {
      doTimeout();
    } else if (status === 'sent') {
      setType('');
    } else if (status === 'fail') {
      setType('fail');
    }
    return clear;
  }, [status, doTimeout]);
  useEffect(function () {
    if (onChange) {
      onChange(type);
    }
  }, [onChange, type]);
  function handleRetry() {
    setType('loading');
    doTimeout();
    if (onRetry) {
      onRetry();
    }
  }
  if (type) {
    return /*#__PURE__*/React.createElement("div", {
      className: "MessageStatus",
      "data-status": type
    }, type === 'fail' ? /*#__PURE__*/React.createElement(IconButton, {
      icon: "warning-circle-fill",
      onClick: handleRetry
    }) : /*#__PURE__*/React.createElement(Icon, {
      type: "spinner",
      spin: true,
      onClick: handleRetry
    }));
  }
  return null;
};