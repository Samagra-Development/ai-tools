import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useRef, useImperativeHandle, useCallback } from 'react';
import clsx from 'clsx';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { useLocale } from '../LocaleProvider';
import canUse from '../../utils/canUse';
var canPassive = canUse('passiveListener');
var listenerOpts = canPassive ? {
  passive: true
} : false;
var listenerOptsWithoutPassive = canPassive ? {
  passive: false
} : false;
var MOVE_INTERVAL = 80;
var btnTextMap = {
  inited: 'hold2talk',
  recording: 'release2send',
  willCancel: 'release2send'
};
var ts = 0;
var startY = 0;
export var Recorder = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var volume = props.volume,
    onStart = props.onStart,
    onEnd = props.onEnd,
    onCancel = props.onCancel;
  var _useState = useState('inited'),
    _useState2 = _slicedToArray(_useState, 2),
    status = _useState2[0],
    setStatus = _useState2[1];
  var btnRef = useRef(null);
  var _useLocale = useLocale('Recorder'),
    trans = _useLocale.trans;
  var doEnd = useCallback(function () {
    var duration = Date.now() - ts;
    if (onEnd) {
      onEnd({
        duration: duration
      });
    }
  }, [onEnd]);
  useImperativeHandle(ref, function () {
    return {
      stop: function stop() {
        setStatus('inited');
        doEnd();
        ts = 0;
      }
    };
  });
  useEffect(function () {
    var wrapper = btnRef.current;
    function handleTouchStart(e) {
      if (e.cancelable) {
        e.preventDefault();
      }
      var touch0 = e.touches[0];
      startY = touch0.pageY;
      ts = Date.now();
      setStatus('recording');
      if (onStart) {
        onStart();
      }
    }
    function handleTouchMove(e) {
      if (!ts) return;
      var nowY = e.touches[0].pageY;
      var isCancel = startY - nowY > MOVE_INTERVAL;
      setStatus(isCancel ? 'willCancel' : 'recording');
    }
    function handleTouchEnd(e) {
      if (!ts) return;
      var endY = e.changedTouches[0].pageY;
      var isRecording = startY - endY < MOVE_INTERVAL;
      setStatus('inited');
      if (isRecording) {
        doEnd();
      } else if (onCancel) {
        onCancel();
      }
    }
    wrapper.addEventListener('touchstart', handleTouchStart, listenerOptsWithoutPassive);
    wrapper.addEventListener('touchmove', handleTouchMove, listenerOpts);
    wrapper.addEventListener('touchend', handleTouchEnd);
    wrapper.addEventListener('touchcancel', handleTouchEnd);
    return function () {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchmove', handleTouchMove);
      wrapper.removeEventListener('touchend', handleTouchEnd);
      wrapper.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [doEnd, onCancel, onStart]);
  var isCancel = status === 'willCancel';
  var wavesStyle = {
    transform: "scale(".concat((volume || 1) / 100 + 1, ")")
  };
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Recorder', {
      'Recorder--cancel': isCancel
    }),
    ref: btnRef
  }, status !== 'inited' && /*#__PURE__*/React.createElement(Flex, {
    className: "RecorderToast",
    direction: "column",
    center: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "RecorderToast-waves",
    hidden: status !== 'recording',
    style: wavesStyle
  }, /*#__PURE__*/React.createElement(Icon, {
    className: "RecorderToast-wave-1",
    type: "hexagon"
  }), /*#__PURE__*/React.createElement(Icon, {
    className: "RecorderToast-wave-2",
    type: "hexagon"
  }), /*#__PURE__*/React.createElement(Icon, {
    className: "RecorderToast-wave-3",
    type: "hexagon"
  })), /*#__PURE__*/React.createElement(Icon, {
    className: "RecorderToast-icon",
    type: isCancel ? 'cancel' : 'mic'
  }), /*#__PURE__*/React.createElement("span", null, trans(isCancel ? 'release2cancel' : 'releaseOrSwipe'))), /*#__PURE__*/React.createElement("div", {
    className: "Recorder-btn",
    role: "button",
    "aria-label": trans('hold2talk')
  }, /*#__PURE__*/React.createElement("span", null, trans(btnTextMap[status]))));
});