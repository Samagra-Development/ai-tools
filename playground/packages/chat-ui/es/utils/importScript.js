export function importScript(url, name) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    var destroy = function destroy() {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (name && window[name]) {
        delete window[name];
      }
    };
    script.onload = function () {
      resolve(window[name]);
      destroy();
    };
    script.onerror = function () {
      reject(new Error("Failed to import: ".concat(url)));
      destroy();
    };
    script.src = url;
    document.head.appendChild(script);
  });
}