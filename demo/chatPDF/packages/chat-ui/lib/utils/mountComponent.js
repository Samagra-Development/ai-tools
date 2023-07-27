"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountComponent = mountComponent;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function mountComponent(Comp) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  var div = document.createElement('div');
  root.appendChild(div);
  var Clone = /*#__PURE__*/_react.default.cloneElement(Comp, {
    onUnmount: function onUnmount() {
      _reactDom.default.unmountComponentAtNode(div);
      if (root && div) {
        root.removeChild(div);
      }
    }
  });
  _reactDom.default.render(Clone, div);
  return div;
}