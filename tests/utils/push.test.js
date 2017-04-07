/* global $subject, $state, $routes */
import assert from 'assert'
import { push as pushActionCreator } from '../../lib/actionCreators'
import { initialState } from '../../lib/reducer'
import push from '../../lib/utils/push'

const postsRoutes = [
  { breadcrumb: 'Home', path: '/' },
  { breadcrumb: 'Posts', path: '/posts' }
]

const postsCrumbs = [
  {
    breadcrumbKey: '/',
    component: 'Home',
    current: false,
    location: {},
    params: {},
    url: '/'
  },
  {
    breadcrumbKey: '/posts',
    component: 'Posts',
    current: true,
    location: {},
    params: {},
    url: '/'
  }
]

describe('push', () => {
  subject(() => action => push($state, action))
  def('state', () => initialState)
  def('routes', () => postsRoutes)

  function assertRouteMissing (fn) {
    assert.throws(fn, /routes must contain at least one route/)
  }

  it('should set state', () => {
    const action = pushActionCreator({ routes: $routes })

    assert.deepEqual($subject(action), postsCrumbs)
  })

  it('should require payload', () => {
    assert.throws(() => $subject({}), /payload is required/)
  })

  it('should throw for empty routes', () => {
    const action = pushActionCreator({ routes: [] })
    assertRouteMissing(() => $subject(action))
  })

  it('should throw for missing routes', () => {
    const action = { type: '@@redux-breadcrumb-trail/PUSH', payload: {} }
    assertRouteMissing(() => $subject(action))
  })

  describe('with breadcrumb trail', () => {
    def('state', () => ({ breadcrumbs: postsCrumbs }))

    it('should pop matching route', () => {
      const routes = [
        { breadcrumb: 'Home', path: '/' },
        { breadcrumb: 'Replaced', path: '/posts' }
      ]

      const action = pushActionCreator({ routes })
      const result = $subject(action)
      assert.equal(result[1].component, 'Replaced')
    })

    it('should not pop route with different params', () => {
      const routes = [
        { breadcrumb: 'Home', path: '/' },
        { breadcrumb: 'Posts', path: '/posts' }
      ]

      const action = pushActionCreator({ routes, params: { different: true } })
      const result = $subject(action)

      assert.equal(result.length, 3)
    })

    it('should reset', () => {
      const routes = [
        { breadcrumb: 'Home', path: '/' },
        { breadcrumb: 'About', path: '/about' }
      ]

      const action = pushActionCreator({ routes, location: { state: { breadcrumb: 'reset' } } })
      assert.equal($subject(action).length, 2)
    })

    it('should replace', () => {
      const routes = [
        { breadcrumb: 'Home', path: '/' },
        { breadcrumb: 'Posts', path: '/posts' }
      ]

      const action = pushActionCreator({ routes, params: { different: true }, location: { action: 'REPLACE' } })
      assert.equal($subject(action).length, 2)
    })
  })
})
