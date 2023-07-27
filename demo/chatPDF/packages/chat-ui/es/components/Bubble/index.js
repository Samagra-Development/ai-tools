import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["type", "content", "children"];
import React from 'react';
export var Bubble = function Bubble(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? 'text' : _props$type,
    content = props.content,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "Bubble ".concat(type),
    "data-type": type
  }, other), content && /*#__PURE__*/React.createElement("p", null, content), children);
};