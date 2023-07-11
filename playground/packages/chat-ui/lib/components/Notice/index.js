"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notice = void 0;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../Icon");
var _IconButton = require("../IconButton");
var _Text = require("../Text");
var Notice = function Notice(props) {
  var content = props.content,
    _props$closable = props.closable,
    closable = _props$closable === void 0 ? true : _props$closable,
    _props$leftIcon = props.leftIcon,
    leftIcon = _props$leftIcon === void 0 ? 'bullhorn' : _props$leftIcon,
    onClick = props.onClick,
    onClose = props.onClose;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Notice",
    role: "alert",
    "aria-atomic": true,
    "aria-live": "assertive"
  }, leftIcon && /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "Notice-icon",
    type: leftIcon
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "Notice-content",
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_Text.Text, {
    className: "Notice-text",
    truncate: true
  }, content)), closable && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: "Notice-close",
    icon: "close",
    onClick: onClose,
    "aria-label": "\u5173\u95ED\u901A\u77E5"
  }));
};
exports.Notice = Notice;