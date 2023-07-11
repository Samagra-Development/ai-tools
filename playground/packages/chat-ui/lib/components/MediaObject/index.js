"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaObject = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var MediaObject = function MediaObject(props) {
  var className = props.className,
    picUrl = props.picUrl,
    picSize = props.picSize,
    title = props.title,
    picAlt = props.picAlt,
    meta = props.meta;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('MediaObject', className)
  }, picUrl && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('MediaObject-pic', picSize && "MediaObject-pic--".concat(picSize))
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: picUrl,
    alt: picAlt || title
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "MediaObject-info"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "MediaObject-title"
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "MediaObject-meta"
  }, meta)));
};
exports.MediaObject = MediaObject;