import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/* eslint-disable no-underscore-dangle */
import { useState, useMemo, useRef, useCallback } from 'react';
import { getRandomString } from '../utils';
var TIME_GAP = 5 * 60 * 1000;
var lastTs = 0;
var makeMsg = function makeMsg(msg, id) {
  var ts = msg.createdAt || Date.now();
  var hasTime = msg.hasTime || ts - lastTs > TIME_GAP;
  if (hasTime) {
    lastTs = ts;
  }
  return _objectSpread(_objectSpread({}, msg), {}, {
    _id: msg._id || id || getRandomString(),
    createdAt: ts,
    position: msg.position || 'left',
    hasTime: hasTime
  });
};
var TYPING_ID = '_TYPING_';
export default function useMessages() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var initialMsgs = useMemo(function () {
    return initialState.map(function (t) {
      return makeMsg(t);
    });
  }, [initialState]);
  var _useState = useState(initialMsgs),
    _useState2 = _slicedToArray(_useState, 2),
    messages = _useState2[0],
    setMessages = _useState2[1];
  var isTypingRef = useRef(false);
  var prependMsgs = useCallback(function (msgs) {
    setMessages(function (prev) {
      return [].concat(_toConsumableArray(msgs), _toConsumableArray(prev));
    });
  }, []);
  var updateMsg = useCallback(function (id, msg) {
    setMessages(function (prev) {
      return prev.map(function (t) {
        return t._id === id ? makeMsg(msg, id) : t;
      });
    });
  }, []);
  var appendMsg = useCallback(function (msg) {
    var newMsg = makeMsg(msg);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      updateMsg(TYPING_ID, newMsg);
    } else {
      setMessages(function (prev) {
        return [].concat(_toConsumableArray(prev), [newMsg]);
      });
    }
  }, [updateMsg]);
  var deleteMsg = useCallback(function (id) {
    setMessages(function (prev) {
      return prev.filter(function (t) {
        return t._id !== id;
      });
    });
  }, []);
  var resetList = useCallback(function () {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    setMessages(list);
  }, []);
  var setTyping = useCallback(function (typing) {
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