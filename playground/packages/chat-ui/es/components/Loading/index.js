import React from 'react';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
export var Loading = function Loading(props) {
  var tip = props.tip,
    children = props.children;
  return /*#__PURE__*/React.createElement(Flex, {
    className: "Loading",
    center: true
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "spinner",
    spin: true
  }), tip && /*#__PURE__*/React.createElement("p", {
    className: "Loading-tip"
  }, tip), children);
};