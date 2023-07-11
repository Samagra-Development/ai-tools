"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
var _excluded = ["className", "label", "color", "variant", "size", "icon", "loading", "block", "disabled", "btnColor", "children", "onClick"];
function composeClass(type) {
  return type && "Btn--".concat(type);
}
var Button = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    label = props.label,
    color = props.color,
    variant = props.variant,
    oSize = props.size,
    oIcon = props.icon,
    loading = props.loading,
    block = props.block,
    disabled = props.disabled,
    btnColor = props.btnColor,
    children = props.children,
    onClick = props.onClick,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var icon = oIcon || loading && 'spinner';
  var size = oSize || (block ? 'lg' : '');
  function handleClick(e) {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  }
  return /*#__PURE__*/_react.default.createElement("button", (0, _extends2.default)({
    style: {
      background: btnColor ? btnColor : ''
    },
    className: (0, _clsx.default)('Btn', composeClass(color), composeClass(variant), composeClass(size), {
      'Btn--block': block
    }, className),
    type: "button",
    disabled: disabled,
    onClick: handleClick,
    ref: ref
  }, other), icon && /*#__PURE__*/_react.default.createElement("span", {
    className: "Btn-icon"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: icon,
    spin: loading
  })), label || children);
});
exports.Button = Button;