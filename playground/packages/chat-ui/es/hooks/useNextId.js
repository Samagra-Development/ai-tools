import { useRef } from 'react';
var nextId = 0;
// eslint-disable-next-line no-plusplus
var getNextId = function getNextId() {
  return nextId++;
};
export default function useNextId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id-';
  var idRef = useRef("".concat(prefix).concat(getNextId()));
  return idRef.current;
}