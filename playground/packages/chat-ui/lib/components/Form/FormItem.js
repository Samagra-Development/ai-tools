"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = void 0;
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _Label = require("../Label");
var _HelpText = require("../HelpText");
var FormItem = function FormItem(props) {
  var label = props.label,
    help = props.help,
    required = props.required,
    invalid = props.invalid,
    hidden = props.hidden,
    children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.default)('FormItem', {
      required: required,
      'is-invalid': invalid
    }),
    hidden: hidden
  }, label && /*#__PURE__*/_react.default.createElement(_Label.Label, null, label), children, help && /*#__PURE__*/_react.default.createElement(_HelpText.HelpText, null, help));
};
exports.FormItem = FormItem;