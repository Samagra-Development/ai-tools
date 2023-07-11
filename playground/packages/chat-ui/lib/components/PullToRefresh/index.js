"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PullToRefresh = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _style = require("../../utils/style");
var _Icon = require("../Icon");
var _Flex = require("../Flex");
var _Button = require("../Button");
var _canUse = _interopRequireDefault(require("../../utils/canUse"));
var _smoothScroll = _interopRequireDefault(require("../../utils/smoothScroll"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var canPassive = (0, _canUse.default)('passiveListener');
var listenerOpts = canPassive ? {
  passive: true
} : false;
var listenerOptsWithoutPassive = canPassive ? {
  passive: false
} : false;
var PullToRefresh = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$distance = props.distance,
    oDistance = _props$distance === void 0 ? 30 : _props$distance,
    _props$loadingDistanc = props.loadingDistance,
    loadingDistance = _props$loadingDistanc === void 0 ? 30 : _props$loadingDistanc,
    maxDistance = props.maxDistance,
    _props$distanceRatio = props.distanceRatio,
    distanceRatio = _props$distanceRatio === void 0 ? 2 : _props$distanceRatio,
    _props$loadMoreText = props.loadMoreText,
    loadMoreText = _props$loadMoreText === void 0 ? '点击加载更多' : _props$loadMoreText,
    children = props.children,
    onScroll = props.onScroll,
    onRefresh = props.onRefresh,
    _props$renderIndicato = props.renderIndicator,
    renderIndicator = _props$renderIndicato === void 0 ? function (status) {
      if (status === 'active' || status === 'loading') {
        return /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
          className: "PullToRefresh-spinner",
          type: "spinner",
          spin: true
        });
      }
      return null;
    } : _props$renderIndicato;
  var wrapperRef = (0, _react.useRef)(null);
  var contentRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    distance = _useState2[0],
    setDistance = _useState2[1];
  var _useState3 = (0, _react.useState)('pending'),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    status = _useState4[0],
    setStatus = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    dropped = _useState6[0],
    setDropped = _useState6[1];
  var _useState7 = (0, _react.useState)(!props.onRefresh),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    disabled = _useState8[0],
    setDisabled = _useState8[1];
  var sharedRef = (0, _react.useRef)({});
  var statusRef = (0, _react.useRef)(status);
  var timer1 = (0, _react.useRef)();
  var timer2 = (0, _react.useRef)();
  var useFallback = !(0, _canUse.default)('touch');
  (0, _react.useEffect)(function () {
    statusRef.current = status;
  }, [status]);
  var setContentStyle = function setContentStyle(y) {
    var content = contentRef.current;
    if (content) {
      (0, _style.setTransform)(content, "translate3d(0px,".concat(y, "px,0)"));
    }
  };
  var scrollTo = function scrollTo(_ref) {
    var y = _ref.y,
      _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? true : _ref$animated;
    var scroller = wrapperRef.current;
    if (!scroller) return;
    var offsetTop = y === '100%' ? scroller.scrollHeight - scroller.offsetHeight : y;
    if (animated) {
      (0, _smoothScroll.default)({
        el: scroller,
        to: offsetTop,
        x: false
      });
    } else {
      scroller.scrollTop = offsetTop;
    }
  };
  var scrollToEnd = (0, _react.useCallback)(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$animated = _ref2.animated,
      animated = _ref2$animated === void 0 ? true : _ref2$animated;
    scrollTo({
      y: '100%',
      animated: animated
    });
  }, []);
  var reset = (0, _react.useCallback)(function () {
    setDistance(0);
    setStatus('pending');
    setContentStyle(0);
  }, []);
  var handleLoadMore = (0, _react.useCallback)(function () {
    var scroller = wrapperRef.current;
    if (!scroller) return;
    setStatus('loading');
    try {
      var sh = scroller.scrollHeight;
      onRefresh().then(function (res) {
        var handleOffset = function handleOffset() {
          scrollTo({
            y: scroller.scrollHeight - sh - 50,
            animated: false
          });
        };
        clearTimeout(timer1.current);
        clearTimeout(timer2.current);
        handleOffset();
        timer1.current = setTimeout(handleOffset, 150);
        timer2.current = setTimeout(handleOffset, 250);
        reset();
        if (res && res.noMore) {
          setDisabled(true);
        }
      });
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.error(ex);
      reset();
    }
  }, [onRefresh, reset]);
  var touchStart = function touchStart(e) {
    sharedRef.current.startY = e.touches[0].clientY;
    sharedRef.current.canPull = wrapperRef.current && wrapperRef.current.scrollTop <= 0;
    if (sharedRef.current.canPull) {
      setStatus('pull');
      setDropped(false);
    }
  };
  var touchMove = (0, _react.useCallback)(function (e) {
    var currentY = e.touches[0].clientY;
    var _sharedRef$current = sharedRef.current,
      canPull = _sharedRef$current.canPull,
      startY = _sharedRef$current.startY;
    if (!canPull || currentY < startY || statusRef.current === 'loading') return;
    var dist = (currentY - startY) / distanceRatio;
    if (maxDistance && dist > maxDistance) {
      dist = maxDistance;
    }
    if (dist > 0) {
      if (e.cancelable) {
        e.preventDefault();
      }
      e.stopPropagation();
      setContentStyle(dist);
      setDistance(dist);
      setStatus(dist >= oDistance ? 'active' : 'pull');
    }
  }, [distanceRatio, maxDistance, oDistance]);
  var touchEnd = (0, _react.useCallback)(function () {
    setDropped(true);
    if (statusRef.current === 'active') {
      handleLoadMore();
    } else {
      reset();
    }
  }, [handleLoadMore, reset]);
  (0, _react.useEffect)(function () {
    var wrapper = wrapperRef.current;
    if (!wrapper || useFallback) return;
    if (disabled) {
      wrapper.removeEventListener('touchstart', touchStart);
      wrapper.removeEventListener('touchmove', touchMove);
      wrapper.removeEventListener('touchend', touchEnd);
      wrapper.removeEventListener('touchcancel', touchEnd);
    } else {
      wrapper.addEventListener('touchstart', touchStart, listenerOpts);
      wrapper.addEventListener('touchmove', touchMove, listenerOptsWithoutPassive);
      wrapper.addEventListener('touchend', touchEnd);
      wrapper.addEventListener('touchcancel', touchEnd);
    }
  }, [disabled, touchEnd, touchMove, useFallback]);
  (0, _react.useEffect)(function () {
    if (status === 'loading' && !useFallback) {
      setContentStyle(loadingDistance);
    }
  }, [loadingDistance, status, useFallback]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      scrollTo: scrollTo,
      scrollToEnd: scrollToEnd,
      wrapperRef: wrapperRef
    };
  }, [scrollToEnd]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "PullToRefresh",
    ref: wrapperRef,
    onScroll: onScroll
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "PullToRefresh-inner"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('PullToRefresh-content', {
      'PullToRefresh-transition': dropped
    }),
    ref: contentRef
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "PullToRefresh-indicator"
  }, renderIndicator(status, distance)), !disabled && useFallback && /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: "PullToRefresh-fallback",
    center: true
  }, renderIndicator(status, oDistance), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    className: "PullToRefresh-loadMore",
    variant: "text",
    onClick: handleLoadMore
  }, loadMoreText)), _react.default.Children.only(children))));
});
exports.PullToRefresh = PullToRefresh;