"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _utils = require("../utils");
function useMount(_ref) {
  var _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    ref = _ref.ref,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 300 : _ref$delay;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isShow = _useState2[0],
    setIsShow = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    didMount = _useState4[0],
    setDidMount = _useState4[1];
  var timeout = (0, _react.useRef)();
  var clear = function clear() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };
  (0, _react.useEffect)(function () {
    if (active) {
      clear();
      setDidMount(active);
    } else {
      setIsShow(active);
      timeout.current = setTimeout(function () {
        setDidMount(active);
      }, delay);
    }
    return clear;
  }, [active, delay]);
  (0, _react.useEffect)(function () {
    if (ref.current) {
      (0, _utils.reflow)(ref.current);
    }
    setIsShow(didMount);
  }, [didMount, ref]);
  return {
    didMount: didMount,
    isShow: isShow
  };
}
var _default = useMount;
exports.default = _default;