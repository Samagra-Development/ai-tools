"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentsProvider = void 0;
Object.defineProperty(exports, "useComponents", {
  enumerable: true,
  get: function get() {
    return _useComponents.useComponents;
  }
});
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _lazyComponent = require("../../utils/lazyComponent");
var _LazyComponent = require("../LazyComponent");
var _ComponentsContext = require("./ComponentsContext");
var _useComponents = require("./useComponents");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var ComponentsProvider = function ComponentsProvider(props) {
  var components = props.components,
    children = props.children;
  var componentsRef = _react.default.useRef(_objectSpread({}, components));
  (0, _react.useEffect)(function () {
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
        return /*#__PURE__*/_react.default.createElement(_LazyComponent.LazyComponentWithCode, (0, _extends2.default)({
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
      var _component = (0, _lazyComponent.lazyComponent)(comp.url, comp.name, function () {
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
  return /*#__PURE__*/_react.default.createElement(_ComponentsContext.ComponentsContext.Provider, {
    value: {
      addComponent: addComponent,
      hasComponent: hasComponent,
      getComponent: getComponent
    }
  }, children);
};
exports.ComponentsProvider = ComponentsProvider;