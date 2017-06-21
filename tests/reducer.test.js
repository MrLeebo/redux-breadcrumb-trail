import assert from 'assert'
import * as actionCreators from '../lib/actionCreators'
import reducer, { initialState } from '../lib/reducer'

describe('reducer', () => {
  it('should ignore unrecognized actions', () => {
    assert.equal(reducer(initialState, {}), initialState)
  })

  it('should populate initial state', () => {
    assert.equal(reducer(undefined, {}), initialState)
  })

  describe('push', () => {
    it('should change state', () => {
      const action = actionCreators.push({ routes: [{}] })
      const result = reducer(initialState, action)

      assert.equal(result.breadcrumbs.length, 1)
    })
  })

  describe('reset', () => {
    it('should restore initial state', () => {
      const action = actionCreators.reset()
      const result = reducer({ fizz: 'buzz' }, action)

      assert.equal(result, initialState)
    })
  })
})
