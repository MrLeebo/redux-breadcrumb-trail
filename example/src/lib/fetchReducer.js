import * as types from './actionTypes'

const initialState = { current: null }

export default function fetchReducer (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PENDING:
    case types.RESET: {
      return initialState
    }

    case types.FETCH_FULFILLED: {
      return { current: action.payload }
    }

    default: {
      return state
    }
  }
}
