import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "active", "completed", "disabled", "status", "index", "title", "subTitle", "desc", "children"];
import React from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
function renderDot(status) {
  if (status) {
    var iconMap = {
      success: 'check-circle-fill',
      fail: 'warning-circle-fill',
      abort: 'dash-circle-fill'
    };
    return /*#__PURE__*/React.createElement(Icon, {
      type: iconMap[status]
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "Step-dot"
  });
}
export var Step = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    _props$active = props.active,
    active = _props$active === void 0 ? false : _props$active,
    _props$completed = props.completed,
    completed = _props$completed === void 0 ? false : _props$completed,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    status = props.status,
    index = props.index,
    title = props.title,
    subTitle = props.subTitle,
    desc = props.desc,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/React.createElement("li", _extends({
    className: clsx('Step', {
      'Step--active': active,
      'Step--completed': completed,
      'Step--disabled': disabled
    }, className),
    ref: ref,
    "data-status": status
  }, other), /*#__PURE__*/React.createElement("div", {
    className: "Step-icon"
  }, renderDot(status)), /*#__PURE__*/React.createElement("div", {
    className: "Step-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "Step-content"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "Step-title"
  }, title && /*#__PURE__*/React.createElement("span", null, title), subTitle && /*#__PURE__*/React.createElement("small", null, subTitle)), desc && /*#__PURE__*/React.createElement("div", {
    className: "Step-desc"
  }, desc), children));
});