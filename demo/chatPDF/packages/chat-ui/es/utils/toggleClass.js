// IE 不支持 toggle 第二个参数
export default (function (className, flag) {
  var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;
  el.classList[flag ? 'add' : 'remove'](className);
});