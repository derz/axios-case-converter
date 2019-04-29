"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.camelResponse = exports.snakeRequest = exports.snakeParams = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _transform = require("./transform");

var snakeParams = function snakeParams(config) {
  if (config.params) {
    config.params = (0, _transform.snake)(config.params);
  }

  return config;
};

exports.snakeParams = snakeParams;

var snakeRequest = function snakeRequest(data, headers) {
  return (0, _transform.snake)(data);
};

exports.snakeRequest = snakeRequest;

var camelResponse = function camelResponse(data, headers) {
  return (0, _transform.camel)(data);
};

exports.camelResponse = camelResponse;

var applyConverters = function applyConverters(axios) {
  axios.defaults.transformRequest = [snakeRequest].concat((0, _toConsumableArray2["default"])(axios.defaults.transformRequest));
  axios.defaults.transformResponse = [].concat((0, _toConsumableArray2["default"])(axios.defaults.transformResponse), [camelResponse]);
  axios.interceptors.request.use(snakeParams);
  return axios;
};

var _default = applyConverters;
exports["default"] = _default;