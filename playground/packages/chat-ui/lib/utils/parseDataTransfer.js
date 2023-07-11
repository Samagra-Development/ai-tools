"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDataTransfer;
function parseDataTransfer(e, callback) {
  // const dataTransfer = e.dataTransfer || e.clipboardData;
  var items = e.clipboardData.items;
  if (items && items.length) {
    // eslint-disable-next-line no-plusplus
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.type.indexOf('image') !== -1) {
        var _file = item.getAsFile();
        if (_file) {
          callback(_file);
        }
        e.preventDefault();
        break;
      }
    }
  }
}