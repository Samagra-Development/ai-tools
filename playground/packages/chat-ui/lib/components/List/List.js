"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var List = function List(props) {
  var _props$bordered = props.bordered,
    bordered = _props$bordered === void 0 ? false : _props$bordered,
    className = props.className,
    children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('List', {
      'List--bordered': bordered
    }, className),
    role: "list"
  }, children);
};
exports.List = List;