import assert from 'assert'
import ensureHasHome from '../../lib/utils/ensureHasHome'

describe('ensureHasHome', () => {
  it('should do nothing without params', () => {
    assert.deepEqual(ensureHasHome(), [])
  })

  it('should do nothing with existing breadcrumb', () => {
    const breadcrumbs = [{}]
    const result = ensureHasHome(breadcrumbs)
    assert.equal(result, breadcrumbs)
    assert.deepEqual(result, [{}])
  })

  it('should not modify existing array', () => {
    const breadcrumbs = []
    const result = ensureHasHome(breadcrumbs, [{ breadcrumb: 'Users', path: '/users' }])
    assert.deepEqual(breadcrumbs, [])
    assert.deepEqual(result, [{ breadcrumbKey: '/users', component: 'Users', current: true, location: {}, params: {}, url: '/' }])
  })
})
