import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { camel as ccCamel, decamelizeKeys as ccSnake } from 'humps';
import { isPlainObject, isURLSearchParams, isFormData } from './util';

var transform = function transform(data, fn) {
  var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!Array.isArray(data) && !isPlainObject(data) && !isFormData(data) && !isURLSearchParams(data)) {
    return data;
  }
  /* eslint-disable no-console */


  if (isFormData(data) && !data.entries) {
    if (navigator.product === 'ReactNative') {
      console.warn('Be careful that FormData cannot be transformed on React Native. If you intentionally implemented, ignore this kind of warning: https://facebook.github.io/react-native/docs/debugging.html');
    } else {
      console.warn('You must use polyfill of FormData.prototype.entries() on Internet Explorer or Safari: https://github.com/jimmywarting/FormData');
    }

    return data;
  }
  /* eslint-enable no-console */


  var prototype = Object.getPrototypeOf(data);
  var store = overwrite ? data : prototype ? new prototype.constructor() : Object.create(null);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (prototype && prototype.entries ? prototype.entries.call(data) : Object.entries(data))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if (prototype && prototype.append) {
        prototype.append.call(store, key.replace(/[^[\]]+/g, function (k) {
          return fn(k);
        }), transform(value, fn));
      } else if (key !== '__proto__') {
        store[fn(key)] = transform(value, fn);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return store;
};

export var createTransform = function createTransform(fn) {
  return function (data) {
    var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return transform(data, fn, overwrite);
  };
};
export var snake = createTransform(ccSnake);
export var camel = createTransform(ccCamel);
export default transform;