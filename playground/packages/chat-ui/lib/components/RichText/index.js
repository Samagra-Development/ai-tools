"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichText = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _dompurify = _interopRequireDefault(require("dompurify"));
require("./configDOMPurify");
var _excluded = ["className", "content", "options"];
var RichText = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    content = props.content,
    _props$options = props.options,
    options = _props$options === void 0 ? {} : _props$options,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var html = {
    __html: _dompurify.default.sanitize(content, options)
  };
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('RichText', className)
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: html,
    ref: ref
  }, other));
});
exports.RichText = RichText;