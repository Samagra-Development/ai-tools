import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { IconButton } from '../IconButton';
export var Action = function Action(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "Composer-actions",
    "data-action-icon": props.icon
  }, /*#__PURE__*/React.createElement(IconButton, _extends({
    size: "lg"
  }, props)));
};