export default function mapBreadcrumb (route = {}, location = {}, params = {}) {
  const { path, indexRoute } = route
  const {
    breadcrumb = indexRoute && indexRoute.breadcrumb || 'Missing breadcrumb',
    breadcrumbKey = path || (indexRoute && (indexRoute.path || indexRoute.breadcrumbKey)) || '/',
    url = `${location.pathname || ''}${location.search || ''}` || '/'
  } = route

  return { component: breadcrumb, breadcrumbKey, url, location, params, current: true }
}
