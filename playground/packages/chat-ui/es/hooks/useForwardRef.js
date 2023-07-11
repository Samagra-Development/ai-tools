import { useEffect, useRef } from 'react';
export default function useForwardRef(ref) {
  var targetRef = useRef(null);
  useEffect(function () {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = targetRef.current;
    }
  }, [ref]);
  return targetRef;
}