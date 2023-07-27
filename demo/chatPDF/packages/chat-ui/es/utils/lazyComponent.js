import React from 'react';
import { importScript } from './importScript';
export function lazyComponent(url, name, success, fail) {
  var ret = /*#__PURE__*/React.lazy(function () {
    return importScript(url, name).then(function (res) {
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
          return /*#__PURE__*/React.createElement(React.Fragment, null);
        }
      };
    });
  });
  return ret;
}