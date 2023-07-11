import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import clsx from 'clsx';
import { IconButton } from '../IconButton';
import { useLocale } from '../LocaleProvider';
var UP = 'up';
var DOWN = 'down';
export var RateActions = function RateActions(props) {
  var _useLocale = useLocale('RateActions', {
      up: '赞同',
      down: '反对'
    }),
    trans = _useLocale.trans;
  var _props$upTitle = props.upTitle,
    upTitle = _props$upTitle === void 0 ? trans('up') : _props$upTitle,
    _props$downTitle = props.downTitle,
    downTitle = _props$downTitle === void 0 ? trans('down') : _props$downTitle,
    onClick = props.onClick;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];
  function handleClick(val) {
    if (!value) {
      setValue(val);
      onClick(val);
    }
  }
  function handleUpClick() {
    handleClick(UP);
  }
  function handleDownClick() {
    handleClick(DOWN);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "RateActions"
  }, value !== DOWN && /*#__PURE__*/React.createElement(IconButton, {
    className: clsx('RateBtn', {
      active: value === UP
    }),
    title: upTitle,
    "data-type": UP,
    icon: "thumbs-up",
    onClick: handleUpClick
  }), value !== UP && /*#__PURE__*/React.createElement(IconButton, {
    className: clsx('RateBtn', {
      active: value === DOWN
    }),
    title: downTitle,
    "data-type": DOWN,
    icon: "thumbs-down",
    onClick: handleDownClick
  }));
};