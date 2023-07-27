"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Card = require("../Card");
var _Flex = require("../Flex");
var _Icon = require("../Icon");
var _Text = require("../Text");
var _getExtName = _interopRequireDefault(require("../../utils/getExtName"));
var _prettyBytes = _interopRequireDefault(require("../../utils/prettyBytes"));
var FileCard = function FileCard(props) {
  var className = props.className,
    file = props.file,
    extension = props.extension,
    children = props.children;
  var name = file.name,
    size = file.size;
  var ext = extension || (0, _getExtName.default)(name);
  return /*#__PURE__*/_react.default.createElement(_Card.Card, {
    className: (0, _clsx.default)('FileCard', className),
    size: "xl"
  }, /*#__PURE__*/_react.default.createElement(_Flex.Flex, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "FileCard-icon",
    "data-type": ext
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    type: "file"
  }), /*#__PURE__*/_react.default.createElement(_Text.Text, {
    truncate: true,
    as: "span",
    className: "FileCard-ext"
  }, ext)), /*#__PURE__*/_react.default.createElement(_Flex.FlexItem, null, /*#__PURE__*/_react.default.createElement(_Text.Text, {
    truncate: 2,
    breakWord: true,
    className: "FileCard-name"
  }, name), /*#__PURE__*/_react.default.createElement("div", {
    className: "FileCard-meta"
  }, size != null && /*#__PURE__*/_react.default.createElement("span", {
    className: "FileCard-size"
  }, (0, _prettyBytes.default)(size)), children))));
};
exports.FileCard = FileCard;