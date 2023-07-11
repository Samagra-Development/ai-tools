"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendConfirm = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _Modal = require("../Modal");
var _Flex = require("../Flex");
var _LocaleProvider = require("../LocaleProvider");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var SendConfirm = function SendConfirm(props) {
  var file = props.file,
    onCancel = props.onCancel,
    onSend = props.onSend;
  var _useState = (0, _react.useState)(''),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    img = _useState2[0],
    setImg = _useState2[1];
  var _useLocale = (0, _LocaleProvider.useLocale)('SendConfirm'),
    trans = _useLocale.trans;
  (0, _react.useEffect)(function () {
    var reader = new FileReader();
    reader.onload = function (e) {
      if (e.target) {
        setImg(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [file]);
  return /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
    className: "SendConfirm",
    title: trans('title'),
    active: !!img,
    vertical: false,
    actions: [{
      label: trans('cancel'),
      onClick: onCancel
    }, {
      label: trans('send'),
      color: 'primary',
      onClick: onSend
    }]
  }, /*#__PURE__*/_react.default.createElement(_Flex.Flex, {
    className: "SendConfirm-inner",
    center: true
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: img,
    alt: ""
  })));
};
exports.SendConfirm = SendConfirm;