import * as types from './actionTypes'

const initialState = { breadcrumbs: [] }

export default function stateReducer (state = initialState, action) {
  switch (action.type) {
    case types.SAVE: {
      return action.payload
    }

    default: {
      return state
    }
  }
}
