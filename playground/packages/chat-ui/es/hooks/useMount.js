import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { useState, useEffect, useRef } from 'react';
import { reflow } from '../utils';
function useMount(_ref) {
  var _ref$active = _ref.active,
    active = _ref$active === void 0 ? false : _ref$active,
    ref = _ref.ref,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 300 : _ref$delay;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isShow = _useState2[0],
    setIsShow = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    didMount = _useState4[0],
    setDidMount = _useState4[1];
  var timeout = useRef();
  var clear = function clear() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };
  useEffect(function () {
    if (active) {
      clear();
      setDidMount(active);
    } else {
      setIsShow(active);
      timeout.current = setTimeout(function () {
        setDidMount(active);
      }, delay);
    }
    return clear;
  }, [active, delay]);
  useEffect(function () {
    if (ref.current) {
      reflow(ref.current);
    }
    setIsShow(didMount);
  }, [didMount, ref]);
  return {
    didMount: didMount,
    isShow: isShow
  };
}
export default useMount;