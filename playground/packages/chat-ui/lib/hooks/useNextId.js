"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNextId;
var _react = require("react");
var nextId = 0;
// eslint-disable-next-line no-plusplus
var getNextId = function getNextId() {
  return nextId++;
};
function useNextId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id-';
  var idRef = (0, _react.useRef)("".concat(prefix).concat(getNextId()));
  return idRef.current;
}