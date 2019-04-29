import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { snake, camel, header } from './transform';
export var snakeParams = function snakeParams(config) {
  if (config.params) {
    config.params = snake(config.params);
  }

  return config;
};
export var snakeRequest = function snakeRequest(data, headers) {
  return snake(data);
};
export var camelResponse = function camelResponse(data, headers) {
  return camel(data);
};

var applyConverters = function applyConverters(axios) {
  axios.defaults.transformRequest = [snakeRequest].concat(_toConsumableArray(axios.defaults.transformRequest));
  axios.defaults.transformResponse = [].concat(_toConsumableArray(axios.defaults.transformResponse), [camelResponse]);
  axios.interceptors.request.use(snakeParams);
  return axios;
};

export default applyConverters;