"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollView = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Item = require("./Item");
var _IconButton = require("../IconButton");
var _canUse = _interopRequireDefault(require("../../utils/canUse"));
var _excluded = ["className", "fullWidth", "scrollX", "effect", "data", "itemKey", "renderItem", "onIntersect", "onScroll", "children"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var hasControls = !(0, _canUse.default)('touch');
var ScrollView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var className = props.className,
    fullWidth = props.fullWidth,
    _props$scrollX = props.scrollX,
    scrollX = _props$scrollX === void 0 ? true : _props$scrollX,
    _props$effect = props.effect,
    effect = _props$effect === void 0 ? 'slide' : _props$effect,
    data = props.data,
    itemKey = props.itemKey,
    renderItem = props.renderItem,
    onIntersect = props.onIntersect,
    onScroll = props.onScroll,
    children = props.children,
    other = (0, _objectWithoutProperties2.default)(props, _excluded);
  var scrollerRef = (0, _react.useRef)(null);
  function handlePrev() {
    var el = scrollerRef.current;
    el.scrollLeft -= el.offsetWidth;
  }
  function handleNext() {
    var el = scrollerRef.current;
    el.scrollLeft += el.offsetWidth;
  }
  var getItemKey = (0, _react.useCallback)(function (item, index) {
    var key;
    if (itemKey) {
      key = typeof itemKey === 'function' ? itemKey(item, index) : item[itemKey];
    }
    return key || index;
  }, [itemKey]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      scrollTo: function scrollTo(_ref) {
        var x = _ref.x,
          y = _ref.y;
        if (x != null) {
          scrollerRef.current.scrollLeft = x;
        }
        if (y != null) {
          scrollerRef.current.scrollTop = y;
        }
      }
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)('ScrollView', {
      'ScrollView--fullWidth': fullWidth,
      'ScrollView--x': scrollX,
      'ScrollView--hasControls': hasControls
    }, className),
    ref: ref
  }, other), hasControls && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: "ScrollView-control",
    icon: "chevron-left",
    "aria-label": "Previous",
    onClick: handlePrev
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "ScrollView-scroller",
    ref: scrollerRef,
    onScroll: onScroll
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "ScrollView-inner"
  }, data.map(function (item, i) {
    return /*#__PURE__*/_react.default.createElement(_Item.Item, {
      item: item,
      effect: item.effect || effect,
      onIntersect: onIntersect,
      key: getItemKey(item, i)
    }, renderItem(item, i));
  }), children ? /*#__PURE__*/_react.default.createElement(_Item.Item, {
    item: {},
    effect: effect,
    onIntersect: onIntersect
  }, children) : null)), hasControls && /*#__PURE__*/_react.default.createElement(_IconButton.IconButton, {
    className: "ScrollView-control",
    icon: "chevron-right",
    "aria-label": "Next",
    onClick: handleNext
  }));
});
exports.ScrollView = ScrollView;