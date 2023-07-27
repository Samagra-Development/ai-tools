import React, { useEffect } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useLocale } from '../LocaleProvider';
export var BackBottom = function BackBottom(_ref) {
  var count = _ref.count,
    onClick = _ref.onClick,
    onDidMount = _ref.onDidMount;
  var _useLocale = useLocale('BackBottom'),
    trans = _useLocale.trans;
  var text = trans('bottom');
  if (count) {
    text = trans(count === 1 ? 'newMsgOne' : 'newMsgOther').replace('{n}', count);
  }
  useEffect(function () {
    if (onDidMount) {
      onDidMount();
    }
  }, [onDidMount]);
  return /*#__PURE__*/React.createElement("div", {
    className: "BackBottom"
  }, /*#__PURE__*/React.createElement(Button, {
    className: "slide-in-right-item",
    onClick: onClick
  }, text, /*#__PURE__*/React.createElement(Icon, {
    type: "chevron-double-down"
  })));
};