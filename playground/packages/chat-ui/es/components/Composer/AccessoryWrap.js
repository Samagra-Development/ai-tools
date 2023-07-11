import React from 'react';
import { ClickOutside } from '../ClickOutside';
export var AccessoryWrap = function AccessoryWrap(_ref) {
  var onClickOutside = _ref.onClickOutside,
    children = _ref.children;
  return /*#__PURE__*/React.createElement(ClickOutside, {
    onClick: onClickOutside
  }, children);
};