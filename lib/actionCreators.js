import * as types from './actionTypes'

export function push (payload) {
  if (!payload || !payload.routes) {
    throw new Error('payload must contain routes property')
  }

  return { type: types.PUSH, payload }
}

export function reset (payload) {
  return { type: types.RESET, payload }
}
