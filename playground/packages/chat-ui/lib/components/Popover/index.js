"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _clsx = _interopRequireDefault(require("clsx"));
var _useMount2 = _interopRequireDefault(require("../../hooks/useMount"));
var _useClickOutside = _interopRequireDefault(require("../../hooks/useClickOutside"));
var _useWindowResize = _interopRequireDefault(require("../../hooks/useWindowResize"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Popover = function Popover(props) {
  var className = props.className,
    active = props.active,
    target = props.target,
    children = props.children,
    onClose = props.onClose;
  var wrapper = (0, _useClickOutside.default)(onClose, 'mousedown');
  var _useMount = (0, _useMount2.default)({
      active: active,
      ref: wrapper
    }),
    didMount = _useMount.didMount,
    isShow = _useMount.isShow;
  var _useState = (0, _react.useState)({}),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    style = _useState2[0],
    setStyle = _useState2[1];
  var updatePos = (0, _react.useCallback)(function () {
    if (!wrapper.current) return;
    var targetRect = target.getBoundingClientRect();
    var rect = wrapper.current.getBoundingClientRect();
    setStyle({
      top: "".concat(targetRect.top - rect.height, "px"),
      left: "".concat(targetRect.left, "px")
    });
  }, [target, wrapper]);
  (0, _react.useEffect)(function () {
    if (wrapper.current) {
      wrapper.current.focus();
      updatePos();
    }
  }, [didMount, updatePos, wrapper]);
  (0, _useWindowResize.default)(updatePos);
  if (!didMount) return null;
  return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Popover', className, {
      active: isShow
    }),
    ref: wrapper,
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "Popover-body"
  }, children), /*#__PURE__*/_react.default.createElement("svg", {
    className: "Popover-arrow",
    viewBox: "0 0 9 5"
  }, /*#__PURE__*/_react.default.createElement("polygon", {
    points: "0,0 5,5, 9,0"
  }))), document.body);
};
exports.Popover = Popover;