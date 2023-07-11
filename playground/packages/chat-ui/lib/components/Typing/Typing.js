"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Typing = Typing;
var _react = _interopRequireDefault(require("react"));
var _Bubble = require("../Bubble");
function Typing() {
  return /*#__PURE__*/_react.default.createElement(_Bubble.Bubble, {
    type: "typing"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Typing",
    "aria-busy": "true"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Typing-dot"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "Typing-dot"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "Typing-dot"
  })));
}