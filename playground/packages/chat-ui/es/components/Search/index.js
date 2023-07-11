import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "onSearch", "onChange", "onClear", "value", "clearable", "showSearch"];
import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { Input } from '../Input';
import { useLocale } from '../LocaleProvider';
export var Search = function Search(_ref) {
  var className = _ref.className,
    onSearch = _ref.onSearch,
    onChange = _ref.onChange,
    onClear = _ref.onClear,
    value = _ref.value,
    _ref$clearable = _ref.clearable,
    clearable = _ref$clearable === void 0 ? true : _ref$clearable,
    _ref$showSearch = _ref.showSearch,
    showSearch = _ref$showSearch === void 0 ? true : _ref$showSearch,
    other = _objectWithoutProperties(_ref, _excluded);
  var _useState = useState(value || ''),
    _useState2 = _slicedToArray(_useState, 2),
    query = _useState2[0],
    setQuery = _useState2[1];
  var _useLocale = useLocale('Search'),
    trans = _useLocale.trans;
  var handleChange = function handleChange(val) {
    setQuery(val);
    if (onChange) {
      onChange(val);
    }
  };
  var handleClear = function handleClear() {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      if (onSearch) {
        onSearch(query, e);
      }
      e.preventDefault();
    }
  };
  var handleSearchClick = function handleSearchClick(e) {
    if (onSearch) {
      onSearch(query, e);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('Search', className)
  }, /*#__PURE__*/React.createElement(Icon, {
    className: "Search-icon",
    type: "search"
  }), /*#__PURE__*/React.createElement(Input, _extends({
    className: "Search-input",
    type: "search",
    value: query,
    enterKeyHint: "search",
    onChange: handleChange,
    onKeyDown: handleKeyDown
  }, other)), clearable && query && /*#__PURE__*/React.createElement(IconButton, {
    className: "Search-clear",
    icon: "x-circle-fill",
    onClick: handleClear
  }), showSearch && /*#__PURE__*/React.createElement(Button, {
    className: "Search-btn",
    color: "primary",
    onClick: handleSearchClick
  }, trans('search')));
};