import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "src", "lazy", "fluid", "children"];
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import useForwardRef from '../../hooks/useForwardRef';
export var Image = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    oSrc = props.src,
    lazy = props.lazy,
    fluid = props.fluid,
    children = props.children,
    other = _objectWithoutProperties(props, _excluded);
  var _useState = useState(lazy ? undefined : oSrc),
    _useState2 = _slicedToArray(_useState, 2),
    src = _useState2[0],
    setSrc = _useState2[1];
  var imgRef = useForwardRef(ref);
  var savedSrc = useRef('');
  var lazyLoaded = useRef(false);
  useEffect(function () {
    if (!lazy) return undefined;
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        entry = _ref2[0];
      if (entry.isIntersecting) {
        setSrc(savedSrc.current);
        lazyLoaded.current = true;
        observer.unobserve(entry.target);
      }
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return function () {
      observer.disconnect();
    };
  }, [imgRef, lazy]);
  useEffect(function () {
    savedSrc.current = oSrc;
    if (!lazy || lazyLoaded.current) {
      setSrc(oSrc);
    }
  }, [lazy, oSrc]);
  return /*#__PURE__*/React.createElement("img", _extends({
    className: clsx('Image', {
      'Image--fluid': fluid
    }, className),
    src: src,
    alt: "",
    ref: imgRef
  }, other));
});