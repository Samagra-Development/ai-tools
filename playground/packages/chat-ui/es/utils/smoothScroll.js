var rAF = requestAnimationFrame;
export default function smoothScroll(_ref) {
  var el = _ref.el,
    to = _ref.to,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 300 : _ref$duration,
    x = _ref.x;
  var count = 0;
  var attr = x ? 'scrollLeft' : 'scrollTop';
  var from = el[attr];
  var frames = Math.round(duration / 16);
  var step = (to - from) / frames;
  if (!rAF) {
    el[attr] = to;
    return;
  }
  function animate() {
    // eslint-disable-next-line no-param-reassign
    el[attr] += step;

    // eslint-disable-next-line no-plusplus
    if (++count < frames) {
      rAF(animate);
    }
  }
  animate();
}