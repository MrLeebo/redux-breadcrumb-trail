import React, { Component, PropTypes } from 'react'

export default function breadcrumbify (Wrapped) {
  class ReduxBreadcrumbTrail extends Component {
    constructor (props) {
      super(props)
      this.state = props
    }

    componentWillReceiveProps (nextProps) {
      const { location, url } = nextProps
      if (location && location.pathname && location.pathname.includes(url)) {
        this.setState(nextProps)
      }
    }

    render () {
      return <Wrapped {...this.state} />
    }
  }

  ReduxBreadcrumbTrail.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    url: PropTypes.string
  }

  ReduxBreadcrumbTrail.displayName = `Breadcrumb(${Wrapped.displayName || Wrapped.name || 'Anonymous'})`

  return ReduxBreadcrumbTrail
}
