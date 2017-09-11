export default function mapBreadcrumb (route = {}, location = {}, params = {}) {
  const { path, indexRoute, ignoreParams } = route
  const {
    breadcrumb = indexRoute && (indexRoute.breadcrumb || 'Missing breadcrumb'),
    breadcrumbKey = path || (indexRoute && (indexRoute.breadcrumbKey || indexRoute.path)) || '/',
    url = `${location.pathname || ''}${location.search || ''}` || '/'
  } = route

  return {
    component: breadcrumb,
    breadcrumbKey,
    url,
    location,
    params: ignoreParams ? {} : params,
    current: true
  }
}
