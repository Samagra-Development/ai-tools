import React from 'react';
import { ToolbarButton } from './ToolbarButton';
export var Toolbar = function Toolbar(props) {
  var items = props.items,
    onClick = props.onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: "Toolbar"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement(ToolbarButton, {
      item: item,
      onClick: onClick,
      key: item.type
    });
  }));
};