import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "content", "options"];
import React from 'react';
import clsx from 'clsx';
import DOMPurify from 'dompurify';
import './configDOMPurify';
export var RichText = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    content = props.content,
    _props$options = props.options,
    options = _props$options === void 0 ? {} : _props$options,
    other = _objectWithoutProperties(props, _excluded);
  var html = {
    __html: DOMPurify.sanitize(content, options)
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('RichText', className)
    // eslint-disable-next-line react/no-danger
    ,
    dangerouslySetInnerHTML: html,
    ref: ref
  }, other));
});