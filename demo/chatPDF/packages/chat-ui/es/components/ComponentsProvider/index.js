import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React, { useEffect } from 'react';
import { lazyComponent } from '../../utils/lazyComponent';
import { LazyComponentWithCode } from '../LazyComponent';
import { ComponentsContext } from './ComponentsContext';
export { useComponents } from './useComponents';
export var ComponentsProvider = function ComponentsProvider(props) {
  var components = props.components,
    children = props.children;
  var componentsRef = React.useRef(_objectSpread({}, components));
  useEffect(function () {
    componentsRef.current = _objectSpread(_objectSpread({}, components), componentsRef.current);
  }, [components]);
  function addComponent(code, val) {
    componentsRef.current[code] = val;
  }
  function hasComponent(code) {
    return componentsRef.current.hasOwnProperty(code);
  }
  function getComponent(code) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var comp = componentsRef.current[code];

    // no component
    if (!comp) {
      callback({
        code: code,
        errCode: 'NO_CODE'
      });
      return null;
    }
    if ('component' in comp) {
      if (comp.type !== 'decorator') {
        callback({
          code: code,
          async: false,
          component: comp.component
        });
      }
      return comp.component;
    }
    if ('decorator' in comp) {
      var component = function component(compProps) {
        return /*#__PURE__*/React.createElement(LazyComponentWithCode, _extends({
          code: comp.decorator,
          decoratorData: comp.data,
          onLoad: callback
        }, compProps));
      };
      componentsRef.current[code] = {
        component: component,
        type: 'decorator'
      };
      return component;
    }
    if ('url' in comp) {
      var _component = lazyComponent(comp.url, comp.name, function () {
        componentsRef.current[code] = {
          component: _component
        };
        callback({
          code: code,
          async: true,
          component: _component
        });
      }, function () {
        callback({
          code: code,
          errCode: 'ERR_IMPORT_SCRIPT'
        });
      });
      return _component;
    }
    callback({
      code: code,
      errCode: 'NO_HANDLER'
    });
    return null;
  }
  return /*#__PURE__*/React.createElement(ComponentsContext.Provider, {
    value: {
      addComponent: addComponent,
      hasComponent: hasComponent,
      getComponent: getComponent
    }
  }, children);
};