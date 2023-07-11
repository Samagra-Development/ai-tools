"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeNode = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Icon = require("../Icon");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var TreeNode = function TreeNode(props) {
  var title = props.title,
    content = props.content,
    link = props.link,
    _props$children = props.children,
    children = _props$children === void 0 ? [] : _props$children,
    _onClick = props.onClick,
    onExpand = props.onExpand;
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    expand = _useState2[0],
    setExpand = _useState2[1];
  var hasChildren = children.length > 0;
  function handleTitleClick() {
    if (hasChildren) {
      setExpand(!expand);
      onExpand(title, !expand);
    } else {
      _onClick({
        title: title,
        content: content,
        link: link
      });
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "TreeNode",
    role: "treeitem",
    "aria-expanded": expand
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "TreeNode-title",
    onClick: handleTitleClick,
    role: "treeitem",
    "aria-expanded": expand,
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "TreeNode-title-text"
  }, title), hasChildren ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    className: "TreeNode-title-icon",
    type: expand ? 'chevron-up' : 'chevron-down'
  }) : null), hasChildren ? children.map(function (t, j) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.default)('TreeNode-children', {
        'TreeNode-children-active': expand
      }),
      key: j
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "TreeNode-title TreeNode-children-title",
      onClick: function onClick() {
        return _onClick(_objectSpread(_objectSpread({}, t), {
          index: j
        }));
      },
      role: "treeitem"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "TreeNode-title-text"
    }, t.title)));
  }) : null);
};
exports.TreeNode = TreeNode;