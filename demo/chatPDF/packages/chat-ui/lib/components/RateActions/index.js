"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RateActions = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _IconButton = require("../IconButton");
var _LocaleProvider = require("../LocaleProvider");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var UP = 'up';
var DOWN = 'down';
var RateActions = function RateActions(props) {
  var _useLocale = (0, _LocaleProvider.useLocale)('RateActions', {
      up: '赞同',
      down: '反对'
    }),
    trans = _useLocale.trans;
  var _props$upTitle = props.upTitle,
    upTitle = _props$upTitle === void 0 ? trans('up') : _props$upTitle,
    _props$downTitle = props.downTitle,
    downTitle = _props$downTitle === void 0 ? trans('down') : _props$downTitle,
    onClick = props.onClick;
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  function handleClick(val) {
    if (!value) {
      setValue(val);
      onClick(val);
    }
  }
  function handleUpClick() {
    handleClick(UP);
  }
  function handleDownClick() {
    handleClick(DOWN);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "RateActions"
  }, value !== DOWN && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: (0, _clsx.default)('RateBtn', {
      active: value === UP
    }),
    title: upTitle,
    "data-type": UP,
    icon: "thumbs-up",
    onClick: handleUpClick
  }), value !== UP && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: (0, _clsx.default)('RateBtn', {
      active: value === DOWN
    }),
    title: downTitle,
    "data-type": DOWN,
    icon: "thumbs-down",
    onClick: handleDownClick
  }));
};
exports.RateActions = RateActions;