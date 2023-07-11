import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "type", "variant", "value", "placeholder", "rows", "minRows", "maxRows", "maxLength", "showCount", "multiline", "autoSize", "onChange", "disabled"];
import React, { useState, useEffect, useContext, useCallback } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '../Form';
import useForwardRef from '../../hooks/useForwardRef';
function getCount(value, maxLength) {
  return "".concat("".concat(value).length).concat(maxLength ? "/".concat(maxLength) : '');
}
export var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$type = props.type,
    type = _props$type === void 0 ? 'text' : _props$type,
    oVariant = props.variant,
    value = props.value,
    placeholder = props.placeholder,
    _props$rows = props.rows,
    oRows = _props$rows === void 0 ? 1 : _props$rows,
    _props$minRows = props.minRows,
    minRows = _props$minRows === void 0 ? oRows : _props$minRows,
    _props$maxRows = props.maxRows,
    maxRows = _props$maxRows === void 0 ? 5 : _props$maxRows,
    maxLength = props.maxLength,
    _props$showCount = props.showCount,
    showCount = _props$showCount === void 0 ? !!maxLength : _props$showCount,
    multiline = props.multiline,
    autoSize = props.autoSize,
    onChange = props.onChange,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    other = _objectWithoutProperties(props, _excluded);
  var initialRows = oRows;
  if (initialRows < minRows) {
    initialRows = minRows;
  } else if (initialRows > maxRows) {
    initialRows = maxRows;
  }
  var _useState = useState(initialRows),
    _useState2 = _slicedToArray(_useState, 2),
    rows = _useState2[0],
    setRows = _useState2[1];
  var _useState3 = useState(21),
    _useState4 = _slicedToArray(_useState3, 2),
    lineHeight = _useState4[0],
    setLineHeight = _useState4[1];
  var inputRef = useForwardRef(ref);
  var theme = useContext(ThemeContext);
  var variant = oVariant || (theme === 'light' ? 'flushed' : 'outline');
  var isMultiline = multiline || autoSize || oRows > 1;
  var Element = isMultiline ? 'textarea' : 'input';
  useEffect(function () {
    if (!inputRef.current) return;
    var lhStr = getComputedStyle(inputRef.current, null).lineHeight;
    var lh = Number(lhStr.replace('px', ''));
    if (lh !== lineHeight) {
      setLineHeight(lh);
    }
  }, [inputRef, lineHeight]);
  var updateRow = useCallback(function () {
    if (!autoSize || !inputRef.current) return;
    var target = inputRef.current;
    var prevRows = target.rows;
    target.rows = minRows;
    if (placeholder) {
      target.placeholder = '';
    }

    // eslint-disable-next-line no-bitwise
    var currentRows = ~~(target.scrollHeight / lineHeight);
    if (currentRows === prevRows) {
      target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      target.rows = maxRows;
      target.scrollTop = target.scrollHeight;
    }
    setRows(currentRows < maxRows ? currentRows : maxRows);
    if (placeholder) {
      target.placeholder = placeholder;
    }
  }, [autoSize, inputRef, lineHeight, maxRows, minRows, placeholder]);
  useEffect(function () {
    if (value === '') {
      setRows(initialRows);
    } else {
      updateRow();
    }
  }, [initialRows, updateRow, value]);
  var handleChange = useCallback(function (e) {
    updateRow();
    if (onChange) {
      var valueFromEvent = e.target.value;
      var shouldTrim = maxLength && valueFromEvent.length > maxLength;
      var val = shouldTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;
      onChange(val, e);
    }
  }, [maxLength, onChange, updateRow]);
  var input = /*#__PURE__*/React.createElement(Element, _extends({
    className: clsx('Input', "Input--".concat(variant), className),
    type: type,
    value: value,
    placeholder: placeholder,
    maxLength: maxLength,
    ref: inputRef,
    rows: rows,
    disabled: disabled,
    onChange: handleChange
  }, other));
  if (showCount) {
    return /*#__PURE__*/React.createElement("div", {
      className: clsx('InputWrapper', {
        'has-counter': showCount
      })
    }, input, showCount && /*#__PURE__*/React.createElement("div", {
      className: "Input-counter"
    }, getCount(value, maxLength)));
  }
  return input;
});