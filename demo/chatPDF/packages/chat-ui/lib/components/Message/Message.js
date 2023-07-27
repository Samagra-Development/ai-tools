"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _SystemMessage = require("./SystemMessage");
var _Avatar = require("../Avatar");
var _Time = require("../Time");
var _Typing = require("../Typing");
var _excluded = ["renderMessageContent"];
var Message = function Message(props) {
  var _props$renderMessageC = props.renderMessageContent,
    renderMessageContent = _props$renderMessageC === void 0 ? function () {
      return null;
    } : _props$renderMessageC,
    msg = (0, _objectWithoutProperties2.default)(props, _excluded);
  var type = msg.type,
    content = msg.content,
    _msg$user = msg.user,
    user = _msg$user === void 0 ? {} : _msg$user,
    id = msg._id,
    _msg$position = msg.position,
    position = _msg$position === void 0 ? 'left' : _msg$position,
    _msg$hasTime = msg.hasTime,
    hasTime = _msg$hasTime === void 0 ? true : _msg$hasTime,
    createdAt = msg.createdAt;
  var name = user.name,
    avatar = user.avatar;
  if (type === 'system') {
    return /*#__PURE__*/_react.default.createElement(_SystemMessage.SystemMessage, {
      content: content.text,
      action: content.action
    });
  }
  var isRL = position === 'right' || position === 'left';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Message', position),
    "data-id": id,
    "data-type": type
  }, hasTime && createdAt && /*#__PURE__*/_react.default.createElement("div", {
    className: "Message-meta"
  }, /*#__PURE__*/_react.default.createElement(_Time.Time, {
    date: createdAt
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "Message-main"
  }, isRL && avatar && /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    src: avatar,
    alt: name,
    url: user.url
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "Message-inner"
  }, isRL && name && /*#__PURE__*/_react.default.createElement("div", {
    className: "Message-author"
  }, name), /*#__PURE__*/_react.default.createElement("div", {
    className: "Message-content",
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "false"
  }, type === 'typing' ? /*#__PURE__*/_react.default.createElement(_Typing.Typing, null) : renderMessageContent(msg)))));
};
var _default = /*#__PURE__*/_react.default.memo(Message);
exports.default = _default;