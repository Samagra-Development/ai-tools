import React from 'react';
import clsx from 'clsx';
export var Tree = function Tree(props) {
  var className = props.className,
    children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Tree', className),
    role: "tree"
  }, children);
};