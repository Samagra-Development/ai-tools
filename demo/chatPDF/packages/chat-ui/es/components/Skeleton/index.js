import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React from 'react';
import clsx from 'clsx';
export var Skeleton = function Skeleton(_ref) {
  var className = _ref.className,
    w = _ref.w,
    h = _ref.h,
    mb = _ref.mb,
    r = _ref.r,
    style = _ref.style;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Skeleton', r && "Skeleton--r-".concat(r), className),
    style: _objectSpread(_objectSpread({}, style), {}, {
      width: w,
      height: h,
      marginBottom: mb
    })
  });
};