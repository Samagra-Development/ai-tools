import { useEffect, useRef } from 'react';
export default function useClickOutside(handler) {
  var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
  var ref = useRef();
  useEffect(function () {
    var listener = function listener(e) {
      var targetElement = ref.current;
      if (!targetElement || targetElement.contains(e.target)) {
        return;
      }
      if (handler) {
        handler(e);
      }
    };
    document.addEventListener(eventName, listener);
    return function () {
      document.removeEventListener(eventName, listener);
    };
  }, [eventName, handler]);
  return ref;
}