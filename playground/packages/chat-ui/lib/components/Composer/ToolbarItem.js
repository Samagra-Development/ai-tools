"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _Action = require("./Action");
var ToolbarItem = function ToolbarItem(props) {
  var item = props.item,
    onClick = props.onClick;
  return /*#__PURE__*/_react.default.createElement(_Action.Action, {
    icon: item.icon,
    img: item.img,
    "data-icon": item.icon,
    "data-tooltip": item.title || null,
    "aria-label": item.title,
    onClick: onClick
  });
};
exports.ToolbarItem = ToolbarItem;