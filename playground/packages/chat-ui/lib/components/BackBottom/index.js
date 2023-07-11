"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackBottom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _Icon = require("../Icon");
var _LocaleProvider = require("../LocaleProvider");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var BackBottom = function BackBottom(_ref) {
  var count = _ref.count,
    onClick = _ref.onClick,
    onDidMount = _ref.onDidMount;
  var _useLocale = (0, _LocaleProvider.useLocale)('BackBottom'),
    trans = _useLocale.trans;
  var text = trans('bottom');
  if (count) {
    text = trans(count === 1 ? 'newMsgOne' : 'newMsgOther').replace('{n}', count);
  }
  (0, _react.useEffect)(function () {
    if (onDidMount) {
      onDidMount();
    }
  }, [onDidMount]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "BackBottom"
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    className: "slide-in-right-item",
    onClick: onClick
  }, text, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: "chevron-double-down"
  })));
};
exports.BackBottom = BackBottom;