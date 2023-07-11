"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentsContext = void 0;
var _react = _interopRequireDefault(require("react"));
var ComponentsContext = /*#__PURE__*/_react.default.createContext({
  addComponent: function addComponent() {},
  hasComponent: function hasComponent() {
    return false;
  },
  getComponent: function getComponent() {
    return null;
  }
});
exports.ComponentsContext = ComponentsContext;