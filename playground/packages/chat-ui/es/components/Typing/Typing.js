import React from 'react';
import { Bubble } from '../Bubble';
export function Typing() {
  return /*#__PURE__*/React.createElement(Bubble, {
    type: "typing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Typing",
    "aria-busy": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "Typing-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "Typing-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "Typing-dot"
  })));
}