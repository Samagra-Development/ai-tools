"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardMedia = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Flex = require("../Flex");
var _excluded = ["className", "aspectRatio", "color", "image", "children"];
var CardMedia = function CardMedia(props) {
  var className = props.className,
    _props$aspectRatio = props.aspectRatio,
    aspectRatio = _props$aspectRatio === void 0 ? 'square' : _props$aspectRatio,
    color = props.color,
    image = props.image,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var bgStyle = {
    backgroundColor: color || undefined,
    backgroundImage: typeof image === 'string' ? "url('".concat(image, "')") : undefined
  };
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('CardMedia', {
      'CardMedia--wide': aspectRatio === 'wide',
      'CardMedia--square': aspectRatio === 'square'
    }, className),
    style: bgStyle
  }, other), children && /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: "CardMedia-content",
    direction: "column",
    center: true
  }, children));
};
exports.CardMedia = CardMedia;