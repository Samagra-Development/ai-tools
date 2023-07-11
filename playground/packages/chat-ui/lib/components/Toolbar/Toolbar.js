"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = void 0;
var _react = _interopRequireDefault(require("react"));
var _ToolbarButton = require("./ToolbarButton");
var Toolbar = function Toolbar(props) {
  var items = props.items,
    onClick = props.onClick;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Toolbar"
  }, items.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_ToolbarButton.ToolbarButton, {
      item: item,
      onClick: onClick,
      key: item.type
    });
  }));
};
exports.Toolbar = Toolbar;