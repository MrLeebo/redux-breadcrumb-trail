import mapBreadcrumb from './mapBreadcrumb'

export default function ensureHasHome (breadcrumbs = [], routes) {
  if (breadcrumbs && breadcrumbs.length) return breadcrumbs

  const first = routes && routes[0]
  return first && ([...breadcrumbs, mapBreadcrumb(first)] || breadcrumbs)
}
