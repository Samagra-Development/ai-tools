import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { Flex } from '../Flex';
import { useLocale } from '../LocaleProvider';
export var SendConfirm = function SendConfirm(props) {
  var file = props.file,
    onCancel = props.onCancel,
    onSend = props.onSend;
  var _useState = useState(''),
    _useState2 = _slicedToArray(_useState, 2),
    img = _useState2[0],
    setImg = _useState2[1];
  var _useLocale = useLocale('SendConfirm'),
    trans = _useLocale.trans;
  useEffect(function () {
    var reader = new FileReader();
    reader.onload = function (e) {
      if (e.target) {
        setImg(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [file]);
  return /*#__PURE__*/React.createElement(Modal, {
    className: "SendConfirm",
    title: trans('title'),
    active: !!img,
    vertical: false,
    actions: [{
      label: trans('cancel'),
      onClick: onCancel
    }, {
      label: trans('send'),
      color: 'primary',
      onClick: onSend
    }]
  }, /*#__PURE__*/React.createElement(Flex, {
    className: "SendConfirm-inner",
    center: true
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: ""
  })));
};