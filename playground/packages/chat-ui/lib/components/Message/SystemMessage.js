"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemMessage = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var SystemMessage = function SystemMessage(props) {
  var className = props.className,
    content = props.content,
    action = props.action;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Message SystemMessage', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "SystemMessage-inner"
  }, /*#__PURE__*/_react.default.createElement("span", null, content), action && /*#__PURE__*/_react.default.createElement("a", {
    href: "javascript:;",
    onClick: action.onClick
  }, action.text)));
};
exports.SystemMessage = SystemMessage;