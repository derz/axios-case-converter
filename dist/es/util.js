import _typeof from "@babel/runtime/helpers/typeof";
export var isURLSearchParams = function isURLSearchParams(value) {
  return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
};
export var isFormData = function isFormData(value) {
  return typeof FormData !== 'undefined' && value instanceof FormData;
};
export var isPlainObject = function isPlainObject(value) {
  return _typeof(value) === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Object]';
};