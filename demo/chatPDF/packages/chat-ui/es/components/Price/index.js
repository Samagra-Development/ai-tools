import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "price", "currency", "locale", "original"];
/* eslint-disable react/no-array-index-key */
import React from 'react';
import clsx from 'clsx';
var canFormat = 'Intl' in window && typeof Intl.NumberFormat.prototype.formatToParts === 'function';
export var Price = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    price = props.price,
    currency = props.currency,
    locale = props.locale,
    original = props.original,
    other = _objectWithoutProperties(props, _excluded);
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
      _split2 = _slicedToArray(_split, 2),
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('Price', {
      'Price--original': original
    }, className),
    ref: ref
  }, other), parts.map(function (t, i) {
    return t.value ? /*#__PURE__*/React.createElement("span", {
      className: "Price-".concat(t.type),
      key: i
    }, t.value) : null;
  }));
});