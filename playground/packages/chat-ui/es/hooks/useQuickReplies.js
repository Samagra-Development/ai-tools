import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState, useEffect, useRef } from 'react';
export default function useQuickReplies() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _useState = useState(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    quickReplies = _useState2[0],
    setQuickReplies = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    visible = _useState4[0],
    setVisible = _useState4[1];
  var savedRef = useRef();
  var stashRef = useRef();
  useEffect(function () {
    savedRef.current = quickReplies;
  }, [quickReplies]);
  var prepend = function prepend(list) {
    setQuickReplies(function (prev) {
      return [].concat(_toConsumableArray(list), _toConsumableArray(prev));
    });
  };

  // prepend、replace 后立即 save 只会保存上一个状态
  // 因为 savedRef.current 的更新优先级最后，用 setTimeout 可解
  var save = function save() {
    stashRef.current = savedRef.current;
  };
  var pop = function pop() {
    if (stashRef.current) {
      setQuickReplies(stashRef.current);
    }
  };
  return {
    quickReplies: quickReplies,
    prepend: prepend,
    replace: setQuickReplies,
    visible: visible,
    setVisible: setVisible,
    save: save,
    pop: pop
  };
}