"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Flex = require("../Flex");
var IMAGE_EMPTY = '//gw.alicdn.com/tfs/TB1fnnLRkvoK1RjSZFDXXXY3pXa-300-250.svg';
var IMAGE_OOPS = '//gw.alicdn.com/tfs/TB1lRjJRbvpK1RjSZPiXXbmwXXa-300-250.svg';
var Empty = function Empty(props) {
  var className = props.className,
    type = props.type,
    image = props.image,
    tip = props.tip,
    children = props.children;
  var imgUrl = image || (type === 'error' ? IMAGE_OOPS : IMAGE_EMPTY);
  return /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: (0, _clsx.default)('Empty', className),
    direction: "column",
    center: true
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "Empty-img",
    src: imgUrl,
    alt: tip
  }), tip && /*#__PURE__*/_react.default.createElement("p", {
    className: "Empty-tip"
  }, tip), children);
};
exports.Empty = Empty;