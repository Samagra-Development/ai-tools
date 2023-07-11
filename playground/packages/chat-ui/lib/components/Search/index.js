"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
var _IconButton = require("../IconButton");
var _Button = require("../Button");
var _Input = require("../Input");
var _LocaleProvider = require("../LocaleProvider");
var _excluded = ["className", "onSearch", "onChange", "onClear", "value", "clearable", "showSearch"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Search = function Search(_ref) {
  var className = _ref.className,
    onSearch = _ref.onSearch,
    onChange = _ref.onChange,
    onClear = _ref.onClear,
    value = _ref.value,
    _ref$clearable = _ref.clearable,
    clearable = _ref$clearable === void 0 ? true : _ref$clearable,
    _ref$showSearch = _ref.showSearch,
    showSearch = _ref$showSearch === void 0 ? true : _ref$showSearch,
    other = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useState = (0, _react.useState)(value || ''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    query = _useState2[0],
    setQuery = _useState2[1];
  var _useLocale = (0, _LocaleProvider.useLocale)('Search'),
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Search', className)
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "Search-icon",
    type: "search"
  }), /*#__PURE__*/_react.default.createElement(_Input.Input, (0, _extends2.default)({
    className: "Search-input",
    type: "search",
    value: query,
    enterKeyHint: "search",
    onChange: handleChange,
    onKeyDown: handleKeyDown
  }, other)), clearable && query && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: "Search-clear",
    icon: "x-circle-fill",
    onClick: handleClear
  }), showSearch && /*#__PURE__*/_react.default.createElement(_Button.Button, {
    className: "Search-btn",
    color: "primary",
    onClick: handleSearchClick
  }, trans('search')));
};
exports.Search = Search;