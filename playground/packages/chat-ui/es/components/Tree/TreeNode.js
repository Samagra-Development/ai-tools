import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
export var TreeNode = function TreeNode(props) {
  var title = props.title,
    content = props.content,
    link = props.link,
    _props$children = props.children,
    children = _props$children === void 0 ? [] : _props$children,
    _onClick = props.onClick,
    onExpand = props.onExpand;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    expand = _useState2[0],
    setExpand = _useState2[1];
  var hasChildren = children.length > 0;
  function handleTitleClick() {
    if (hasChildren) {
      setExpand(!expand);
      onExpand(title, !expand);
    } else {
      _onClick({
        title: title,
        content: content,
        link: link
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "TreeNode",
    role: "treeitem",
    "aria-expanded": expand
  }, /*#__PURE__*/React.createElement("div", {
    className: "TreeNode-title",
    onClick: handleTitleClick,
    role: "treeitem",
    "aria-expanded": expand,
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: "TreeNode-title-text"
  }, title), hasChildren ? /*#__PURE__*/React.createElement(Icon, {
    className: "TreeNode-title-icon",
    type: expand ? 'chevron-up' : 'chevron-down'
  }) : null), hasChildren ? children.map(function (t, j) {
    return /*#__PURE__*/React.createElement("div", {
      className: clsx('TreeNode-children', {
        'TreeNode-children-active': expand
      }),
      key: j
    }, /*#__PURE__*/React.createElement("div", {
      className: "TreeNode-title TreeNode-children-title",
      onClick: function onClick() {
        return _onClick(_objectSpread(_objectSpread({}, t), {
          index: j
        }));
      },
      role: "treeitem"
    }, /*#__PURE__*/React.createElement("span", {
      className: "TreeNode-title-text"
    }, t.title)));
  }) : null);
};