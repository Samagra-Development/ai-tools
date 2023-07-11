"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var observerOptions = {
  threshold: [0, 0.1]
};
var Item = function Item(props) {
  var item = props.item,
    effect = props.effect,
    children = props.children,
    onIntersect = props.onIntersect;
  var itemRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!onIntersect) return undefined;
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
        entry = _ref2[0];
      if (entry.intersectionRatio > 0) {
        // 根据回调返回值判断是否继续监听
        if (!onIntersect(item, entry)) {
          observer.unobserve(entry.target);
        }
      }
    }, observerOptions);
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return function () {
      observer.disconnect();
    };
  }, [item, onIntersect]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('ScrollView-item', {
      'slide-in-right-item': effect === 'slide',
      'A-fadeIn': effect === 'fade'
    }),
    ref: itemRef
  }, children);
};
exports.Item = Item;