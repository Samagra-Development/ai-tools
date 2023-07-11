"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _ScrollView = require("../ScrollView/ScrollView");
var _QuickReply = require("./QuickReply");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var QuickReplies = function QuickReplies(props) {
  var items = props.items,
    visible = props.visible,
    onClick = props.onClick,
    onScroll = props.onScroll;
  var scroller = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(!!onScroll),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    scrollEvent = _useState2[0],
    setScrollEvent = _useState2[1];
  (0, _react.useLayoutEffect)(function () {
    var timer;
    if (scroller.current) {
      setScrollEvent(false);
      scroller.current.scrollTo({
        x: 0,
        y: 0
      });
      timer = setTimeout(function () {
        setScrollEvent(true);
      }, 500);
    }
    return function () {
      clearTimeout(timer);
    };
  }, [items]);
  if (!items.length) return null;
  return /*#__PURE__*/_react.default.createElement(_ScrollView.ScrollView, {
    className: "QuickReplies",
    data: items,
    itemKey: "name",
    ref: scroller,
    "data-visible": visible,
    onScroll: scrollEvent ? onScroll : undefined,
    renderItem: function renderItem(item, index) {
      return /*#__PURE__*/_react.default.createElement(_QuickReply.QuickReply, {
        item: item,
        index: index,
        onClick: onClick,
        key: item.name
      });
    }
  });
};
QuickReplies.defaultProps = {
  items: [],
  visible: true
};
var _default = /*#__PURE__*/_react.default.memo(QuickReplies);
exports.default = _default;