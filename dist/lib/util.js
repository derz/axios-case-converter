"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPlainObject = exports.isFormData = exports.isURLSearchParams = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var isURLSearchParams = function isURLSearchParams(value) {
  return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
};

exports.isURLSearchParams = isURLSearchParams;

var isFormData = function isFormData(value) {
  return typeof FormData !== 'undefined' && value instanceof FormData;
};

exports.isFormData = isFormData;

var isPlainObject = function isPlainObject(value) {
  return (0, _typeof2["default"])(value) === 'object' && value !== null && Object.prototype.toString.call(value) === '[object Object]';
};

exports.isPlainObject = isPlainObject;