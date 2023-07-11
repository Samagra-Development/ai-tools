"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = void 0;
var _react = _interopRequireDefault(require("react"));
var _Flex = require("../Flex");
var _Icon = require("../Icon");
var Loading = function Loading(props) {
  var tip = props.tip,
    children = props.children;
  return /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: "Loading",
    center: true
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: "spinner",
    spin: true
  }), tip && /*#__PURE__*/_react.default.createElement("p", {
    className: "Loading-tip"
  }, tip), children);
};
exports.Loading = Loading;