"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var Avatar = function Avatar(props) {
  var className = props.className,
    src = props.src,
    alt = props.alt,
    url = props.url,
    _props$size = props.size,
    size = _props$size === void 0 ? 'md' : _props$size,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'circle' : _props$shape,
    children = props.children;
  var Element = url ? 'a' : 'span';
  return /*#__PURE__*/_react.default.createElement(Element, {
    className: (0, _clsx.default)('Avatar', "Avatar--".concat(size), "Avatar--".concat(shape), className),
    href: url
  }, src ? /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: alt
  }) : children);
};
exports.Avatar = Avatar;