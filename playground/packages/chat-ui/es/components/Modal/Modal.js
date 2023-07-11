import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { Base } from './Base';
export var Modal = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(Base, _extends({
    baseClass: "Modal",
    btnVariant: props.vertical === false ? undefined : 'outline',
    ref: ref
  }, props));
});