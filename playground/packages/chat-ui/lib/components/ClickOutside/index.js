"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickOutside = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children", "onClick", "mouseEvent"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var doc = document;
var html = doc.documentElement;
var ClickOutside = function ClickOutside(props) {
  var children = props.children,
    onClick = props.onClick,
    _props$mouseEvent = props.mouseEvent,
    mouseEvent = _props$mouseEvent === void 0 ? 'mouseup' : _props$mouseEvent,
    others = (0, _objectWithoutProperties2.default)(props, _excluded);
  var wrapper = (0, _react.useRef)(null);
  function handleClick(e) {
    if (!wrapper.current) return;
    if (html.contains(e.target) && !wrapper.current.contains(e.target)) {
      onClick(e);
    }
  }
  (0, _react.useEffect)(function () {
    if (mouseEvent) {
      doc.addEventListener(mouseEvent, handleClick);
    }
    return function () {
      doc.removeEventListener(mouseEvent, handleClick);
    };
  });
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    ref: wrapper
  }, others), children);
};
exports.ClickOutside = ClickOutside;