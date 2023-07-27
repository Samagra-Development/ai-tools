import React from 'react';
export var CarouselItem = function CarouselItem(props) {
  var width = props.width,
    children = props.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "Carousel-item",
    style: {
      width: width
    }
  }, children);
};