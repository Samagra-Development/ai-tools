var testCache = {
  passiveListener: function passiveListener() {
    var supportsPassive = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line
        get: function get() {
          supportsPassive = true;
        }
      });
      // @ts-ignore
      window.addEventListener('test', null, opts);
    } catch (e) {
      // No support
    }
    return supportsPassive;
  },
  smoothScroll: function smoothScroll() {
    return 'scrollBehavior' in document.documentElement.style;
  },
  touch: function touch() {
    return 'ontouchstart' in window;
  }
};
export function addTest(name, test) {
  // @ts-ignore
  testCache[name] = test();
}
export default function canUse(name) {
  // @ts-ignore
  return testCache[name]();
}