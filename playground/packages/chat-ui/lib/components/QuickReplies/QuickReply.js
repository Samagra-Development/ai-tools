"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickReply = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
var QuickReply = function QuickReply(props) {
  var item = props.item,
    index = props.index,
    onClick = props.onClick;
  function handleClick() {
    onClick(item, index);
  }
  return /*#__PURE__*/_react.default.createElement("button", {
    className: (0, _clsx.default)('QuickReply', {
      new: item.isNew,
      highlight: item.isHighlight
    }),
    type: "button",
    "data-code": item.code,
    "aria-label": "\u5FEB\u6377\u77ED\u8BED: ".concat(item.name, "\uFF0C\u53CC\u51FB\u53D1\u9001"),
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "QuickReply-inner"
  }, item.icon && /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: item.icon
  }), item.img && /*#__PURE__*/_react.default.createElement("img", {
    className: "QuickReply-img",
    src: item.img,
    alt: ""
  }), /*#__PURE__*/_react.default.createElement("span", null, item.name)));
};
exports.QuickReply = QuickReply;