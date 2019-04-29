import {
  camelizeKeys,
  decamelizeKeys
} from 'humps';

import { isPlainObject, isURLSearchParams, isFormData } from './util'

const transform = (data, fn, overwrite = false) => {
  if (!Array.isArray(data) && !isPlainObject(data) && !isFormData(data) && !isURLSearchParams(data)) {
    return data
  }

  /* eslint-disable no-console */
  if (isFormData(data) && !data.entries) {
    console.warn('You must use polyfill of FormData.prototype.entries() on Internet Explorer or Safari: https://github.com/jimmywarting/FormData')

    return data;
  }
  /* eslint-enable no-console */

  const prototype = Object.getPrototypeOf(data)
  const store = overwrite ? data : prototype ? new prototype.constructor : Object.create(null)
  for (const [key, value] of prototype && prototype.entries ? prototype.entries.call(data) : Object.entries(data)) {
    if (prototype && prototype.append) {
      prototype.append.call(store, key.replace(/[^[\]]+/g, k => fn(k)), transform(value, fn))
    } else if (key !== '__proto__') {
      store[fn(key)] = transform(value, fn)
    }
  }
  return store
}

export const createTransform = fn => (data, overwrite = false) => transform(data, fn, overwrite)

export const snake = createTransform(decamelizeKeys);
export const camel = createTransform(camelizeKeys);