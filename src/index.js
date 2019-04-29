import { snake, camel } from './transform'

const snakeParams = config => {
  if (config.params) {
    config.params = snake(config.params)
  }

  return config
}

const snakeRequest = (data, headers) => {
  return snake(data)
}

const camelResponse = (data, headers) => {
  return camel(data)
}

const applyConverters = axios => {
  axios.defaults.transformRequest = [snakeRequest, ...axios.defaults.transformRequest]
  axios.defaults.transformResponse = [...axios.defaults.transformResponse, camelResponse]

  axios.interceptors.request.use(snakeParams)

  return axios
}

export default applyConverters;
