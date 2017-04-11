import isMatch from 'lodash/isMatch'
import last from 'lodash/last'
import some from 'lodash/some'
import ensureHasHome from './ensureHasHome'
import mapBreadcrumb from './mapBreadcrumb'

export default function push (state, {payload}) {
  if (!payload) {
    throw new Error('payload is required')
  }

  const { location = {}, params = {}, routes } = payload
  if (!routes || !routes.length) {
    throw new Error('routes must contain at least one route')
  }

  const action = location.state && location.state.breadcrumb
  let breadcrumbs = action === 'reset' ? [] : [...state.breadcrumbs]
  breadcrumbs = ensureHasHome(breadcrumbs, routes)

  const current = routes.reduce((memo, route) => route.useParentBreadcrumb ? memo : route)
  const breadcrumb = mapBreadcrumb(current, location, { ...params })

  const matchBreadcrumb = other => {
    return isMatch(
      { breadcrumbKey: other.breadcrumbKey, params: other.params },
      { breadcrumbKey: breadcrumb.breadcrumbKey, params }
    )
  }

  if (breadcrumbs.length > 1 && location.action === 'REPLACE') {
    breadcrumbs.pop()
  }

  while (some(breadcrumbs, matchBreadcrumb)) {
    breadcrumbs.pop()
  }

  if (breadcrumbs.length > 0) {
    last(breadcrumbs).current = false
  }

  breadcrumbs.push(breadcrumb)
  return breadcrumbs
}
