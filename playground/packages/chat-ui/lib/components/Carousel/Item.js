"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselItem = void 0;
var _react = _interopRequireDefault(require("react"));
var CarouselItem = function CarouselItem(props) {
  var width = props.width,
    children = props.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Carousel-item",
    style: {
      width: width
    }
  }, children);
};
exports.CarouselItem = CarouselItem;