import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
export var ToolbarButton = function ToolbarButton(props) {
  var item = props.item,
    _onClick = props.onClick;
  var type = item.type,
    icon = item.icon,
    img = item.img,
    title = item.title;
  return /*#__PURE__*/React.createElement("div", {
    className: "Toolbar-item",
    "data-type": type
  }, /*#__PURE__*/React.createElement(Button, {
    className: "Toolbar-btn",
    onClick: function onClick(e) {
      return _onClick(item, e);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "Toolbar-btnIcon"
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    type: icon
  }), img && /*#__PURE__*/React.createElement("img", {
    className: "Toolbar-img",
    src: img,
    alt: ""
  })), /*#__PURE__*/React.createElement("span", {
    className: "Toolbar-btnText"
  }, title)));
};