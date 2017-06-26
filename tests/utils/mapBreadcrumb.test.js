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

  it('should map from index route', () => {
    const Index = () => <div>Index</div>

    const { component, breadcrumbKey } = mapBreadcrumb({ indexRoute: { breadcrumb: Index, path: '/index', breadcrumbKey: 'key' } })
    assert.equal(Index, component)
    assert.equal('key', breadcrumbKey)
  })

  it('should map from index path', () => {
    const Index = () => <div>Index</div>

    const { component, breadcrumbKey } = mapBreadcrumb({ indexRoute: { breadcrumb: Index, path: '/index' } })
    assert.equal(Index, component)
    assert.equal('/index', breadcrumbKey)
  })

  it('should map default key', () => {
    const Index = () => <div>Index</div>

    const { component, breadcrumbKey } = mapBreadcrumb({ indexRoute: { breadcrumb: Index } })
    assert.equal(Index, component)
    assert.equal('/', breadcrumbKey)
  })

  it('should map path', () => {
    const { breadcrumbKey } = mapBreadcrumb({ path: '/index' })
    assert.equal('/index', breadcrumbKey)
  })

  it('should map breadcrumb key', () => {
    const { breadcrumbKey } = mapBreadcrumb({ breadcrumbKey: '/key' })
    assert.equal('/key', breadcrumbKey)
  })

  it('should map search', () => {
    const { url } = mapBreadcrumb({}, { pathname: 'pathname', search: '?search=' })
    assert.equal('pathname?search=', url)
  })

  it('should map search', () => {
    const { url } = mapBreadcrumb({ url: '/url' })
    assert.equal('/url', url)
  })
})
