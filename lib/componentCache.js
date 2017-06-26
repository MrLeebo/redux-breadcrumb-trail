import { isValidElement } from 'react'

function isPrimitive(val) {
  return typeof val !== 'function' && typeof val !== 'object'
}

const cache = {}
export default {
  get(key) {
    return cache[key]
  },

  set(key, value) {
    if (!key || !isPrimitive(key)) {
      throw new Error(`Key must be a primitive: ${key}`)
    }

    if (typeof value !== 'function' && !isValidElement(value)) {
      throw new Error(`Value must be a valid react element: ${value}`)
    }

    cache[key] = value
  }
}
