import React from 'react';
import clsx from 'clsx';
export var List = function List(props) {
  var _props$bordered = props.bordered,
    bordered = _props$bordered === void 0 ? false : _props$bordered,
    className = props.className,
    children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('List', {
      'List--bordered': bordered
    }, className),
    role: "list"
  }, children);
};