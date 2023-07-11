import React from 'react';
import clsx from 'clsx';
import { Label } from '../Label';
import { HelpText } from '../HelpText';
export var FormItem = function FormItem(props) {
  var label = props.label,
    help = props.help,
    required = props.required,
    invalid = props.invalid,
    hidden = props.hidden,
    children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx('FormItem', {
      required: required,
      'is-invalid': invalid
    }),
    hidden: hidden
  }, label && /*#__PURE__*/React.createElement(Label, null, label), children, help && /*#__PURE__*/React.createElement(HelpText, null, help));
};