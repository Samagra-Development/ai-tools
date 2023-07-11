import React from 'react';
import ReactDOM from 'react-dom';
export function mountComponent(Comp) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  var div = document.createElement('div');
  root.appendChild(div);
  var Clone = /*#__PURE__*/React.cloneElement(Comp, {
    onUnmount: function onUnmount() {
      ReactDOM.unmountComponentAtNode(div);
      if (root && div) {
        root.removeChild(div);
      }
    }
  });
  ReactDOM.render(Clone, div);
  return div;
}