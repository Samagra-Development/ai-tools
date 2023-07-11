"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Action = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _IconButton = require("../IconButton");
var Action = function Action(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Composer-actions",
    "data-action-icon": props.icon
  }, /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, (0, _extends2.default)({
    size: "lg"
  }, props)));
};
exports.Action = Action;