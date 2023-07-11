"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Price = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _excluded = ["className", "price", "currency", "locale", "original"];
/* eslint-disable react/no-array-index-key */
var canFormat = 'Intl' in window && typeof Intl.NumberFormat.prototype.formatToParts === 'function';
var Price = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    price = props.price,
    currency = props.currency,
    locale = props.locale,
    original = props.original,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var parts = [];
  if (locale && currency && canFormat) {
    parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).formatToParts(price);
  } else {
    parts = undefined;
  }
  if (!parts) {
    var decimal = '.';
    var _split = "".concat(price).split(decimal),
      _split2 = (0, _slicedToArray2.default)(_split, 2),
      integer = _split2[0],
      fraction = _split2[1];
    parts = [{
      type: 'currency',
      value: currency
    }, {
      type: 'integer',
      value: integer
    }, {
      type: 'decimal',
      value: fraction && decimal
    }, {
      type: 'fraction',
      value: fraction
    }];
  }
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('Price', {
      'Price--original': original
    }, className),
    ref: ref
  }, other), parts.map(function (t, i) {
    return t.value ? /*#__PURE__*/_react.default.createElement("span", {
      className: "Price-".concat(t.type),
      key: i
    }, t.value) : null;
  }));
});
exports.Price = Price;