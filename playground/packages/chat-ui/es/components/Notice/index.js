import React from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
export var Notice = function Notice(props) {
  var content = props.content,
    _props$closable = props.closable,
    closable = _props$closable === void 0 ? true : _props$closable,
    _props$leftIcon = props.leftIcon,
    leftIcon = _props$leftIcon === void 0 ? 'bullhorn' : _props$leftIcon,
    onClick = props.onClick,
    onClose = props.onClose;
  return /*#__PURE__*/React.createElement("div", {
    className: "Notice",
    role: "alert",
    "aria-atomic": true,
    "aria-live": "assertive"
  }, leftIcon && /*#__PURE__*/React.createElement(Icon, {
    className: "Notice-icon",
    type: leftIcon
  }), /*#__PURE__*/React.createElement("div", {
    className: "Notice-content",
    onClick: onClick
  }, /*#__PURE__*/React.createElement(Text, {
    className: "Notice-text",
    truncate: true
  }, content)), closable && /*#__PURE__*/React.createElement(IconButton, {
    className: "Notice-close",
    icon: "close",
    onClick: onClose,
    "aria-label": "\u5173\u95ED\u901A\u77E5"
  }));
};