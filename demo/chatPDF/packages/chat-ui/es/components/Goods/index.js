import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "type", "img", "name", "desc", "tags", "locale", "currency", "price", "count", "unit", "action", "children", "originalPrice", "meta", "status"];
import React from 'react';
import clsx from 'clsx';
import { Flex, FlexItem } from '../Flex';
import { Text } from '../Text';
import { Price } from '../Price';
import { Tag } from '../Tag';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
export var Goods = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    type = props.type,
    img = props.img,
    name = props.name,
    desc = props.desc,
    _props$tags = props.tags,
    tags = _props$tags === void 0 ? [] : _props$tags,
    locale = props.locale,
    currency = props.currency,
    price = props.price,
    count = props.count,
    unit = props.unit,
    action = props.action,
    children = props.children,
    originalPrice = props.originalPrice,
    meta = props.meta,
    status = props.status,
    other = _objectWithoutProperties(props, _excluded);
  var isOrder = type === 'order';
  var infos = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    as: "h4",
    truncate: isOrder ? 2 : true,
    className: "Goods-name"
  }, name), /*#__PURE__*/React.createElement(Text, {
    className: "Goods-desc"
  }, desc), /*#__PURE__*/React.createElement("div", {
    className: "Goods-tags"
  }, tags.map(function (t) {
    return /*#__PURE__*/React.createElement(Tag, {
      color: "primary",
      key: t.name
    }, t.name);
  })));
  var priceProps = {
    currency: currency,
    locale: locale
  };
  var priceCont = price != null && /*#__PURE__*/React.createElement(Price, _extends({
    price: price
  }, priceProps));
  var countUnit = /*#__PURE__*/React.createElement("div", {
    className: "Goods-countUnit"
  }, count && /*#__PURE__*/React.createElement("span", {
    className: "Goods-count"
  }, "\xD7", count), unit && /*#__PURE__*/React.createElement("span", {
    className: "Goods-unit"
  }, unit));
  var mainCont = isOrder ? infos : /*#__PURE__*/React.createElement(React.Fragment, null, action && /*#__PURE__*/React.createElement(IconButton, _extends({
    className: "Goods-buyBtn",
    icon: "cart"
  }, action)), infos, /*#__PURE__*/React.createElement(Flex, {
    alignItems: "flex-end"
  }, /*#__PURE__*/React.createElement(FlexItem, null, priceCont, originalPrice && /*#__PURE__*/React.createElement(Price, _extends({
    price: originalPrice,
    original: true
  }, priceProps)), meta && /*#__PURE__*/React.createElement("span", {
    className: "Goods-meta"
  }, meta)), countUnit));
  return /*#__PURE__*/React.createElement(Flex, _extends({
    className: clsx('Goods', className),
    "data-type": type,
    ref: ref
  }, other), img && /*#__PURE__*/React.createElement("img", {
    className: "Goods-img",
    src: img,
    alt: name
  }), /*#__PURE__*/React.createElement(FlexItem, {
    className: "Goods-main"
  }, mainCont, children), isOrder && /*#__PURE__*/React.createElement("div", {
    className: "Goods-aside"
  }, priceCont, countUnit, /*#__PURE__*/React.createElement("span", {
    className: "Goods-status"
  }, status), action && /*#__PURE__*/React.createElement(Button, _extends({
    className: "Goods-detailBtn"
  }, action))));
});