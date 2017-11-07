import * as types from './actionTypes'

const initialState = { product: null, products: null, place: null, places: null }

export default function fetchReducer (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PENDING:
    case types.RESET: {
      return initialState
    }

    case types.FETCH_FULFILLED: {
      return { [action.meta.key]: action.payload }
    }

    default: {
      return state
    }
  }
}
