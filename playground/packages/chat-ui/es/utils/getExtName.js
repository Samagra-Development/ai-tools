// eslint-disable-next-line no-bitwise
export default (function (str) {
  return str.slice((str.lastIndexOf('.') - 1 >>> 0) + 2);
});