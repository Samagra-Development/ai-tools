"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Navbar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _IconButton = require("../IconButton");
var Navbar = function Navbar(props) {
  var className = props.className,
    title = props.title,
    logo = props.logo,
    leftContent = props.leftContent,
    _props$rightContent = props.rightContent,
    rightContent = _props$rightContent === void 0 ? [] : _props$rightContent;
  return /*#__PURE__*/_react.default.createElement("header", {
    className: (0, _clsx.default)('Navbar', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Navbar-left"
  }, leftContent && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, (0, _extends2.default)({
    size: "lg"
  }, leftContent))), /*#__PURE__*/_react.default.createElement("div", {
    className: "Navbar-main"
  }, logo ? /*#__PURE__*/_react.default.createElement("img", {
    className: "Navbar-logo",
    src: logo,
    alt: title
  }) : /*#__PURE__*/_react.default.createElement("h2", {
    className: "Navbar-title"
  }, title)), /*#__PURE__*/_react.default.createElement("div", {
    className: "Navbar-right"
  }, rightContent.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, (0, _extends2.default)({
      size: "lg"
    }, item, {
      key: item.icon
    }));
  })));
};
exports.Navbar = Navbar;