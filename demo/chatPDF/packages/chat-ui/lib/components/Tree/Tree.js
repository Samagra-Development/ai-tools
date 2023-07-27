"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var Tree = function Tree(props) {
  var className = props.className,
    children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('Tree', className),
    role: "tree"
  }, children);
};
exports.Tree = Tree;