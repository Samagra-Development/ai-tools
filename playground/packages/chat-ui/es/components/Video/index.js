import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "src", "cover", "duration", "onClick", "onCoverLoad", "style", "videoRef", "children"];
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
export var Video = function Video(props) {
  var className = props.className,
    src = props.src,
    cover = props.cover,
    duration = props.duration,
    onClick = props.onClick,
    onCoverLoad = props.onCoverLoad,
    style = props.style,
    outerVideoRef = props.videoRef,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var localVideoRef = useRef(null);
  var videoRef = outerVideoRef || localVideoRef;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isPlayed = _useState2[0],
    setIsPlayed = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    paused = _useState4[0],
    setPaused = _useState4[1];
  function handleClick(e) {
    setIsPlayed(true);
    var video = videoRef.current;
    if (video) {
      if (video.ended || video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    if (onClick) {
      onClick(paused, e);
    }
  }
  function handlePlay() {
    setPaused(false);
  }
  function handlePause() {
    setPaused(true);
  }
  var hasCover = !isPlayed && !!cover;
  var hasDuration = hasCover && !!duration;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Video', "Video--".concat(paused ? 'paused' : 'playing'), className),
    style: style
  }, hasCover && /*#__PURE__*/React.createElement("img", {
    className: "Video-cover",
    src: cover,
    onLoad: onCoverLoad,
    alt: ""
  }), hasDuration && /*#__PURE__*/React.createElement("span", {
    className: "Video-duration"
  }, duration), /*#__PURE__*/React.createElement("video", _extends({
    className: "Video-video",
    src: src,
    ref: videoRef,
    hidden: hasCover,
    controls: true,
    onPlay: handlePlay,
    onPause: handlePause,
    onEnded: handlePause
  }, other), children), hasCover && /*#__PURE__*/React.createElement("button", {
    className: clsx('Video-playBtn', {
      paused: paused
    }),
    type: "button",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "Video-playIcon"
  })));
};