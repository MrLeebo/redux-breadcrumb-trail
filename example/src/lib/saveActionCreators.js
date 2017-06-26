import * as types from './actionTypes'

export function save (payload) {
  return { type: types.SAVE, payload }
}
