"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useQuickReplies;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
function useQuickReplies() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _useState = (0, _react.useState)(initialState),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    quickReplies = _useState2[0],
    setQuickReplies = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    visible = _useState4[0],
    setVisible = _useState4[1];
  var savedRef = (0, _react.useRef)();
  var stashRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    savedRef.current = quickReplies;
  }, [quickReplies]);
  var prepend = function prepend(list) {
    setQuickReplies(function (prev) {
      return [].concat((0, _toConsumableArray2.default)(list), (0, _toConsumableArray2.default)(prev));
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