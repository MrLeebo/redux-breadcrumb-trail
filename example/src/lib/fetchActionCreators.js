import * as types from './actionTypes'

const products = [
  { id: 1, name: 'Lemonade', price: '0.05', description: 'A classic and refreshing drink' },
  { id: 2, name: 'Raspberry-ade', price: '0.08', description: 'Just a dash of raspberry flavor' },
  { id: 3, name: 'Strawberry Lemonade', price: '0.06', description: 'WARNING: This beverage contains strawberries' },
  { id: 4, name: 'Chocolate Lemonade', price: '0.07', description: 'Uhhh, for real?' }
]

const locations = [
  { id: 1, name: 'Kansas City, MO' },
  { id: 2, name: 'San Francisco, CA' },
  { id: 3, name: 'Austin, TX' }
]

function fetchData (fn) {
  return dispatch => {
    return (...args) => {
      dispatch({ type: types.FETCH_PENDING })

      setTimeout(() => {
        dispatch({
          type: types.FETCH_FULFILLED,
          payload: fn(...args)
        })
      }, 500)
    }
  }
}

export const fetchProduct = fetchData(({id}) => products[id - 1])
export const fetchProducts = fetchData(() => products)
export const fetchLocation = fetchData(({id}) => locations[id - 1])
export const fetchLocations = fetchData(() => locations)

export function reset () {
  return { type: types.RESET }
}
