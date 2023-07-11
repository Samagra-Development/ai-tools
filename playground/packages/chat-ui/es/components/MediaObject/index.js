import React from 'react';
import clsx from 'clsx';
export var MediaObject = function MediaObject(props) {
  var className = props.className,
    picUrl = props.picUrl,
    picSize = props.picSize,
    title = props.title,
    picAlt = props.picAlt,
    meta = props.meta;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('MediaObject', className)
  }, picUrl && /*#__PURE__*/React.createElement("div", {
    className: clsx('MediaObject-pic', picSize && "MediaObject-pic--".concat(picSize))
  }, /*#__PURE__*/React.createElement("img", {
    src: picUrl,
    alt: picAlt || title
  })), /*#__PURE__*/React.createElement("div", {
    className: "MediaObject-info"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "MediaObject-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "MediaObject-meta"
  }, meta)));
};