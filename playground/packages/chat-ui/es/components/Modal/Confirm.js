import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "vertical", "actions"];
import React from 'react';
import clsx from 'clsx';
import { Base } from './Base';
import { useLocale } from '../LocaleProvider';
var isPrimary = function isPrimary(btn) {
  return btn.color === 'primary';
};
export var Confirm = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    oVertical = props.vertical,
    actions = props.actions,
    other = _objectWithoutProperties(props, _excluded);
  var _useLocale = useLocale(),
    _useLocale$locale = _useLocale.locale,
    locale = _useLocale$locale === void 0 ? '' : _useLocale$locale;
  var isZh = locale.includes('zh');
  // 中文默认横排
  var vertical = oVertical != null ? oVertical : !isZh;
  if (Array.isArray(actions)) {
    // 主按钮排序：横排主按钮在后，竖排主按钮在前
    actions.sort(function (a, b) {
      if (isPrimary(a)) {
        return vertical ? -1 : 1;
      }
      if (isPrimary(b)) {
        return vertical ? 1 : -1;
      }
      return 0;
    });
  }
  return /*#__PURE__*/React.createElement(Base, _extends({
    baseClass: "Modal",
    className: clsx('Confirm', className),
    showClose: false,
    btnVariant: "outline",
    vertical: vertical,
    actions: actions,
    ref: ref
  }, other));
});