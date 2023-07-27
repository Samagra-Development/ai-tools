import React from 'react';
export var ComponentsContext = /*#__PURE__*/React.createContext({
  addComponent: function addComponent() {},
  hasComponent: function hasComponent() {
    return false;
  },
  getComponent: function getComponent() {
    return null;
  }
});