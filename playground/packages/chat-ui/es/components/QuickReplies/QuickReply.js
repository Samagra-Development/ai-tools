import React from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
export var QuickReply = function QuickReply(props) {
  var item = props.item,
    index = props.index,
    onClick = props.onClick;
  function handleClick() {
    onClick(item, index);
  }
  return /*#__PURE__*/React.createElement("button", {
    className: clsx('QuickReply', {
      new: item.isNew,
      highlight: item.isHighlight
    }),
    type: "button",
    "data-code": item.code,
    "aria-label": "\u5FEB\u6377\u77ED\u8BED: ".concat(item.name, "\uFF0C\u53CC\u51FB\u53D1\u9001"),
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "QuickReply-inner"
  }, item.icon && /*#__PURE__*/React.createElement(Icon, {
    type: item.icon
  }), item.img && /*#__PURE__*/React.createElement("img", {
    className: "QuickReply-img",
    src: item.img,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, item.name)));
};