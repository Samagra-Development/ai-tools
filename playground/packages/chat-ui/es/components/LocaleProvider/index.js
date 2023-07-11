import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import React, { useContext } from 'react';
import defaultLocales from './locales';
var LocaleContext = /*#__PURE__*/React.createContext(undefined);
var DEFAULT_LOCALE = 'en-US';
var LocaleProvider = function LocaleProvider(_ref) {
  var locale = _ref.locale,
    locales = _ref.locales,
    children = _ref.children;
  return /*#__PURE__*/React.createElement(LocaleContext.Provider, {
    value: {
      locale: locale,
      locales: locales
    }
  }, children);
};
LocaleProvider.defaultProps = {
  locale: DEFAULT_LOCALE
};
var useLocale = function useLocale(comp, fallback) {
  var localeContext = useContext(LocaleContext);
  var _ref2 = localeContext || {},
    locale = _ref2.locale,
    locales = _ref2.locales;
  var defaultStrings = locale && defaultLocales[locale] || defaultLocales[DEFAULT_LOCALE];
  var strings = locales ? _objectSpread(_objectSpread({}, defaultStrings), locales) : defaultStrings;
  if (!localeContext && fallback) {
    strings = fallback;
  } else if (comp) {
    strings = strings[comp] || {};
  }
  return {
    locale: locale,
    trans: function trans(key) {
      return key ? strings[key] : strings;
    }
  };
};
export { LocaleProvider, LocaleContext, useLocale };