import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["active", "index", "children", "onClick"],
  _excluded2 = ["active", "children"];
import React, { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import smoothScroll from '../../utils/smoothScroll';
import useNextId from '../../hooks/useNextId';
var TabItem = function TabItem(props) {
  var active = props.active,
    index = props.index,
    children = props.children,
    onClick = props.onClick,
    others = _objectWithoutProperties(props, _excluded);
  function handleClick(e) {
    onClick(index, e);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "Tabs-navItem"
  }, /*#__PURE__*/React.createElement("button", _extends({
    className: clsx('Tabs-navLink', {
      active: active
    }),
    type: "button",
    role: "tab",
    "aria-selected": active,
    onClick: handleClick
  }, others), /*#__PURE__*/React.createElement("span", null, children)));
};
var TabsPane = function TabsPane(props) {
  var active = props.active,
    children = props.children,
    others = _objectWithoutProperties(props, _excluded2);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx('Tabs-pane', {
      active: active
    })
  }, others, {
    role: "tabpanel"
  }), children);
};
export var Tabs = function Tabs(props) {
  var className = props.className,
    _props$index = props.index,
    oIndex = _props$index === void 0 ? 0 : _props$index,
    scrollable = props.scrollable,
    hideNavIfOnlyOne = props.hideNavIfOnlyOne,
    children = props.children,
    onChange = props.onChange;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    pointerStyles = _useState2[0],
    setPointerStyles = _useState2[1];
  var _useState3 = useState(oIndex || 0),
    _useState4 = _slicedToArray(_useState3, 2),
    index = _useState4[0],
    setIndex = _useState4[1];
  var indexRef = useRef(index);
  var navRef = useRef(null);
  var headers = [];
  var contents = [];
  var tabPaneId = useNextId('tabs-');
  function handleIndexChange(idx, e) {
    setIndex(idx);
    if (onChange) {
      onChange(idx, e);
    }
  }
  React.Children.forEach(children, function (item, idx) {
    if (!item) return;
    var active = index === idx;
    var id = "".concat(tabPaneId, "-").concat(idx);
    headers.push( /*#__PURE__*/React.createElement(TabItem, {
      active: active,
      index: idx,
      key: id,
      onClick: handleIndexChange,
      "aria-controls": id,
      tabIndex: active ? -1 : 0
    }, item.props.label));
    if (item.props.children) {
      contents.push( /*#__PURE__*/React.createElement(TabsPane, {
        active: active,
        key: id,
        id: id
      }, item.props.children));
    }
  });
  useEffect(function () {
    setIndex(oIndex);
  }, [oIndex]);
  var movePointer = useCallback(function () {
    var nav = navRef.current;
    if (!nav) return;
    var currentNav = nav.children[indexRef.current];
    if (!currentNav) return;
    var text = currentNav.querySelector('span');
    if (!text) return;
    var _ref = currentNav,
      navWidth = _ref.offsetWidth,
      navOffsetLeft = _ref.offsetLeft;
    var _text$getBoundingClie = text.getBoundingClientRect(),
      textWidth = _text$getBoundingClie.width;
    var pointerWidth = Math.max(textWidth - 16, 26);
    // 中心位的偏移量
    var offsetLeftOfCenter = navOffsetLeft + navWidth / 2;
    setPointerStyles({
      transform: "translateX(".concat(offsetLeftOfCenter - pointerWidth / 2, "px)"),
      width: "".concat(pointerWidth, "px")
    });
    if (scrollable) {
      smoothScroll({
        el: nav,
        to: offsetLeftOfCenter - nav.offsetWidth / 2,
        x: true
      });
    }
  }, [scrollable]);
  useEffect(function () {
    var nav = navRef.current;
    var ro;
    if (nav && 'ResizeObserver' in window) {
      ro = new ResizeObserver(movePointer);
      ro.observe(nav);
    }
    return function () {
      if (ro && nav) {
        ro.unobserve(nav);
      }
    };
  }, [movePointer]);
  useEffect(function () {
    indexRef.current = index;
    movePointer();
  }, [index, movePointer]);
  var needNav = headers.length > (hideNavIfOnlyOne ? 1 : 0);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Tabs', {
      'Tabs--scrollable': scrollable
    }, className)
  }, needNav && /*#__PURE__*/React.createElement("div", {
    className: "Tabs-nav",
    role: "tablist",
    ref: navRef
  }, headers, /*#__PURE__*/React.createElement("span", {
    className: "Tabs-navPointer",
    style: pointerStyles
  })), /*#__PURE__*/React.createElement("div", {
    className: "Tabs-content"
  }, contents));
};