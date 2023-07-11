"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfiniteScroll = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _useForwardRef = _interopRequireDefault(require("../../hooks/useForwardRef"));
var _getToBottom = _interopRequireDefault(require("../../utils/getToBottom"));
var _excluded = ["className", "disabled", "distance", "children", "onLoadMore", "onScroll"];
var InfiniteScroll = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    disabled = props.disabled,
    _props$distance = props.distance,
    distance = _props$distance === void 0 ? 0 : _props$distance,
    children = props.children,
    onLoadMore = props.onLoadMore,
    onScroll = props.onScroll,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var wrapperRef = (0, _useForwardRef.default)(ref);
  function handleScroll(e) {
    if (onScroll) {
      onScroll(e);
    }
    var el = wrapperRef.current;
    if (!el) return;
    var nearBottom = (0, _getToBottom.default)(el) <= distance;
    if (nearBottom) {
      onLoadMore();
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('InfiniteScroll', className),
    role: "feed",
    onScroll: !disabled ? handleScroll : undefined,
    ref: wrapperRef
  }, other), children);
});
exports.InfiniteScroll = InfiniteScroll;