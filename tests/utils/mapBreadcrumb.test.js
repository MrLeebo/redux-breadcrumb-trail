import assert from 'assert'
import mapBreadcrumb from '../../lib/utils/mapBreadcrumb'

describe('mapBreadcrumb', () => {
  it('should map no params', () => {
    const expected = {
      breadcrumbKey: '/',
      component: 'Missing breadcrumb',
      current: true,
      location: {},
      params: {},
      url: '/'
    }

    assert.deepEqual(mapBreadcrumb(), expected)
  })

  it('should map simple route', () => {
    const About = () => <div>About</div>

    const expected = {
      breadcrumbKey: '/about',
      component: About,
      current: true,
      location: {},
      params: {},
      url: '/'
    }

    assert.deepEqual(mapBreadcrumb({ breadcrumb: About, path: '/about' }), expected)
  })
})
