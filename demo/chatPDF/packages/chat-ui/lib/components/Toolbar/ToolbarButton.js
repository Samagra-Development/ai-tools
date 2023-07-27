"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = require("../Button");
var _Icon = require("../Icon");
var ToolbarButton = function ToolbarButton(props) {
  var item = props.item,
    _onClick = props.onClick;
  var type = item.type,
    icon = item.icon,
    img = item.img,
    title = item.title;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Toolbar-item",
    "data-type": type
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    className: "Toolbar-btn",
    onClick: function onClick(e) {
      return _onClick(item, e);
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "Toolbar-btnIcon"
  }, icon && /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: icon
  }), img && /*#__PURE__*/_react.default.createElement("img", {
    className: "Toolbar-img",
    src: img,
    alt: ""
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "Toolbar-btnText"
  }, title)));
};
exports.ToolbarButton = ToolbarButton;