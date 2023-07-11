"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lazyComponent = lazyComponent;
var _react = _interopRequireDefault(require("react"));
var _importScript = require("./importScript");
function lazyComponent(url, name, success, fail) {
  var ret = /*#__PURE__*/_react.default.lazy(function () {
    return (0, _importScript.importScript)(url, name).then(function (res) {
      if (!res.default) {
        throw new Error("Failed to import ".concat(name, " component: no default export"));
      }
      ret.WrappedComponent = res.default || res;
      if (success) {
        success();
      }
      return res;
    }).catch(function (err) {
      if (fail) {
        fail(err);
      }
      return {
        default: function _default() {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
        }
      };
    });
  });
  return ret;
}