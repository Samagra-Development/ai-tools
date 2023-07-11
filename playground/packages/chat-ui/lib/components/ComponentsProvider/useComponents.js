"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponents = useComponents;
var _react = _interopRequireDefault(require("react"));
var _ComponentsContext = require("./ComponentsContext");
function useComponents() {
  return _react.default.useContext(_ComponentsContext.ComponentsContext);
}