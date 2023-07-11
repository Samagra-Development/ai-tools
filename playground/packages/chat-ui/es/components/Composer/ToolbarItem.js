import React from 'react';
import { Action } from './Action';
export var ToolbarItem = function ToolbarItem(props) {
  var item = props.item,
    onClick = props.onClick;
  return /*#__PURE__*/React.createElement(Action, {
    icon: item.icon,
    img: item.img,
    "data-icon": item.icon,
    "data-tooltip": item.title || null,
    "aria-label": item.title,
    onClick: onClick
  });
};