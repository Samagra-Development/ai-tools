import React from 'react';
import clsx from 'clsx';
export var SystemMessage = function SystemMessage(props) {
  var className = props.className,
    content = props.content,
    action = props.action;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Message SystemMessage', className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "SystemMessage-inner"
  }, /*#__PURE__*/React.createElement("span", null, content), action && /*#__PURE__*/React.createElement("a", {
    href: "javascript:;",
    onClick: action.onClick
  }, action.text)));
};