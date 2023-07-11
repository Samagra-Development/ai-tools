"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = riseInput;
var _ua = require("../../utils/ua");
var iOS = (0, _ua.isIOS)();
function testScrollType() {
  if (iOS) {
    if ((0, _ua.isSafariOrIOS11)()) {
      /**
       * 不处理
       * - Safari
       * - iOS 11.0-11.3（`scrollTop`/`scrolIntoView` 有 bug）
       */
      return 0;
    }
    var major = (0, _ua.getIOSMajorVersion)();
    // iOS 12及以下用 `scrollTop` 的方式
    if (major < 13) {
      return 1;
    }
  }
  // 其它的用 `scrollIntoView` 的方式
  return 2;
}
function riseInput(input, wrap) {
  var scrollType = testScrollType();
  var scrollTimer;
  var target = wrap || input;
  var scrollIntoView = function scrollIntoView() {
    if (scrollType === 0) return;
    if (scrollType === 1) {
      document.body.scrollTop = document.body.scrollHeight;
    } else {
      target.scrollIntoView(false);
    }
  };
  input.addEventListener('focus', function () {
    setTimeout(scrollIntoView, 300);
    scrollTimer = setTimeout(scrollIntoView, 1000);
  });
  input.addEventListener('blur', function () {
    clearTimeout(scrollTimer);

    // 某些情况下收起键盘后输入框不收回，页面下面空白
    // 比如：闲鱼、大麦、乐动力、微信
    if (scrollType && iOS) {
      // 以免点击快捷短语无效
      setTimeout(function () {
        document.body.scrollIntoView();
      });
    }
  });
}