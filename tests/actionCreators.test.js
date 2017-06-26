import assert from 'assert'
import * as types from '../lib/actionTypes'
import * as actionCreators from '../lib/actionCreators'

describe('actionCreators', () => {
  describe('push', () => {
    it('should have type and payload', () => {
      const payload = { routes: [] }
      assert.deepEqual(actionCreators.push(payload), { type: types.PUSH, payload })
    })

    it('should throw if routes are missing', () => {
      assert.throws(() => actionCreators.push(), /payload must contain routes property/)
    })
  })

  describe('reset', () => {
    it('should have type', () => {
      assert.deepEqual(actionCreators.reset(), { type: types.RESET, payload: undefined })
    })

    it('should have type and payload', () => {
      const payload = { breadcrumbs: [{}] }
      assert.deepEqual(actionCreators.reset(payload), { type: types.RESET, payload })
    })
  })
})
