import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
var style = {
  position: 'absolute',
  height: '1px',
  width: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  margin: '-1px',
  // padding: 0,
  // border: 0,
  whiteSpace: 'nowrap'
};
export var VisuallyHidden = function VisuallyHidden(props) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: style
  }, props));
};