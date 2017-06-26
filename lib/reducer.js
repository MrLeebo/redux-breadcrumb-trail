import * as types from './actionTypes'
import push from './utils/push'

export const initialState = { breadcrumbs: [] }

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.PUSH: {
      return { breadcrumbs: push(state, action) }
    }

    case types.RESET: {
      return action.payload || initialState
    }

    default: {
      return state
    }
  }
}
