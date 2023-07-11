"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposerInput = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Input = require("../Input");
var _SendConfirm = require("../SendConfirm");
var _riseInput = _interopRequireDefault(require("./riseInput"));
var _parseDataTransfer = _interopRequireDefault(require("../../utils/parseDataTransfer"));
var _canUse = _interopRequireDefault(require("../../utils/canUse"));
var _excluded = ["inputRef", "invisible", "onImageSend", "disabled"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var canTouch = (0, _canUse.default)('touch');
var ComposerInput = function ComposerInput(_ref) {
  var inputRef = _ref.inputRef,
    invisible = _ref.invisible,
    onImageSend = _ref.onImageSend,
    disabled = _ref.disabled,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    pastedImage = _useState2[0],
    setPastedImage = _useState2[1];
  var handlePaste = (0, _react.useCallback)(function (e) {
    (0, _parseDataTransfer.default)(e, setPastedImage);
  }, []);
  var handleImageCancel = (0, _react.useCallback)(function () {
    setPastedImage(null);
  }, []);
  var handleImageSend = (0, _react.useCallback)(function () {
    if (onImageSend && pastedImage) {
      Promise.resolve(onImageSend(pastedImage)).then(function () {
        setPastedImage(null);
      });
    }
  }, [onImageSend, pastedImage]);
  (0, _react.useEffect)(function () {
    if (canTouch && inputRef.current) {
      var $composer = document.querySelector('.Composer');
      (0, _riseInput.default)(inputRef.current, $composer);
    }
  }, [inputRef]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)({
      'S--invisible': invisible
    })
  }, /*#__PURE__*/_react.default.createElement(_Input.Input, (0, _extends2.default)({
    className: "Composer-input",
    rows: 1,
    autoSize: true,
    enterKeyHint: "send",
    onPaste: onImageSend ? handlePaste : undefined,
    ref: inputRef,
    disabled: disabled
  }, rest)), pastedImage && /*#__PURE__*/_react.default.createElement(_SendConfirm.SendConfirm, {
    file: pastedImage,
    onCancel: handleImageCancel,
    onSend: handleImageSend
  }));
};
exports.ComposerInput = ComposerInput;