"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMessages;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = require("react");
var _utils = require("../utils");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /* eslint-disable no-underscore-dangle */
var TIME_GAP = 5 * 60 * 1000;
var lastTs = 0;
var makeMsg = function makeMsg(msg, id) {
  var ts = msg.createdAt || Date.now();
  var hasTime = msg.hasTime || ts - lastTs > TIME_GAP;
  if (hasTime) {
    lastTs = ts;
  }
  return _objectSpread(_objectSpread({}, msg), {}, {
    _id: msg._id || id || (0, _utils.getRandomString)(),
    createdAt: ts,
    position: msg.position || 'left',
    hasTime: hasTime
  });
};
var TYPING_ID = '_TYPING_';
function useMessages() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var initialMsgs = (0, _react.useMemo)(function () {
    return initialState.map(function (t) {
      return makeMsg(t);
    });
  }, [initialState]);
  var _useState = (0, _react.useState)(initialMsgs),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var isTypingRef = (0, _react.useRef)(false);
  var prependMsgs = (0, _react.useCallback)(function (msgs) {
    setMessages(function (prev) {
      return [].concat((0, _toConsumableArray2.default)(msgs), (0, _toConsumableArray2.default)(prev));
    });
  }, []);
  var updateMsg = (0, _react.useCallback)(function (id, msg) {
    setMessages(function (prev) {
      return prev.map(function (t) {
        return t._id === id ? makeMsg(msg, id) : t;
      });
    });
  }, []);
  var appendMsg = (0, _react.useCallback)(function (msg) {
    var newMsg = makeMsg(msg);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      updateMsg(TYPING_ID, newMsg);
    } else {
      setMessages(function (prev) {
        return [].concat((0, _toConsumableArray2.default)(prev), [newMsg]);
      });
    }
  }, [updateMsg]);
  var deleteMsg = (0, _react.useCallback)(function (id) {
    setMessages(function (prev) {
      return prev.filter(function (t) {
        return t._id !== id;
      });
    });
  }, []);
  var resetList = (0, _react.useCallback)(function () {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    setMessages(list);
  }, []);
  var setTyping = (0, _react.useCallback)(function (typing) {
    if (typing === isTypingRef.current) return;
    if (typing) {
      appendMsg({
        _id: TYPING_ID,
        type: 'typing'
      });
    } else {
      deleteMsg(TYPING_ID);
    }
    isTypingRef.current = typing;
  }, [appendMsg, deleteMsg]);
  return {
    messages: messages,
    prependMsgs: prependMsgs,
    appendMsg: appendMsg,
    updateMsg: updateMsg,
    deleteMsg: deleteMsg,
    resetList: resetList,
    setTyping: setTyping
  };
}