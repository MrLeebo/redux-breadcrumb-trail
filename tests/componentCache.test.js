import assert from 'assert'
import { spy } from 'sinon'
import { componentCache } from '../lib'

describe('componentCache', () => {
  it('should add component to cache', () => {
    const func = spy()
    componentCache.set('test', func)
    componentCache.get('test')()
    assert(func.calledOnce)
  })

  it('should not allow null key', () => {
    assert.throws(() => componentCache.set(), /^Error: Key must be a primitive: undefined$/)
  })

  it('should not allow function key', () => {
    assert.throws(() => componentCache.set(function() {}), /^Error: Key must be a primitive:/)
  })

  it('should not allow object key', () => {
    assert.throws(() => componentCache.set({}), /^Error: Key must be a primitive:/)
  })

  it('should not allow null value', () => {
    assert.throws(() => componentCache.set('test'), /^Error: Value must be a valid react element: undefined$/)
  })

  it('should not allow non-renderable value', () => {
    assert.throws(() => componentCache.set('test', { renderable: false }), /^Error: Value must be a valid react element:/)
  })
})
