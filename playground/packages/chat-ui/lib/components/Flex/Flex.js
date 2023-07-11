"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flex = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["as", "className", "inline", "center", "direction", "wrap", "justifyContent", "justify", "alignItems", "align", "children"];
var mapDirection = {
  row: 'Flex--d-r',
  'row-reverse': 'Flex--d-rr',
  column: 'Flex--d-c',
  'column-reverse': 'Flex--d-cr'
};
var mapWrap = {
  nowrap: 'Flex--w-n',
  wrap: 'Flex--w-w',
  'wrap-reverse': 'Flex--w-wr'
};
var mapJustify = {
  'flex-start': 'Flex--jc-fs',
  'flex-end': 'Flex--jc-fe',
  center: 'Flex--jc-c',
  'space-between': 'Flex--jc-sb',
  'space-around': 'Flex--jc-sa'
};
var mapAlign = {
  'flex-start': 'Flex--ai-fs',
  'flex-end': 'Flex--ai-fe',
  center: 'Flex--ai-c'
};
var Flex = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Element = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    inline = props.inline,
    center = props.center,
    direction = props.direction,
    wrap = props.wrap,
    justifyContent = props.justifyContent,
    _props$justify = props.justify,
    justify = _props$justify === void 0 ? justifyContent : _props$justify,
    alignItems = props.alignItems,
    _props$align = props.align,
    align = _props$align === void 0 ? alignItems : _props$align,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(Element, (0, _extends2.default)({
    className: (0, _clsx.default)('Flex', direction && mapDirection[direction], justify && mapJustify[justify], align && mapAlign[align], wrap && mapWrap[wrap], {
      'Flex--inline': inline,
      'Flex--center': center
    }, className),
    ref: ref
  }, other), children);
});
exports.Flex = Flex;