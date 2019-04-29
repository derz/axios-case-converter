import { snake, camel, header } from './transform'

export const snakeParams = config => {
  if (config.params) {
    config.params = snake(config.params)
  }

  return config
}
export const snakeRequest = (data, headers) => {
  return snake(data)
}
export const camelResponse = (data, headers) => {
  return camel(data)
}

const applyConverters = axios => {
  axios.defaults.transformRequest = [snakeRequest, ...axios.defaults.transformRequest]
  axios.defaults.transformResponse = [...axios.defaults.transformResponse, camelResponse]

  axios.interceptors.request.use(snakeParams)

  return axios
}

export default applyConverters
