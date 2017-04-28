import React, { Component } from 'react'
import { shape, string } from 'prop-types'

export default function breadcrumbify (Wrapped) {
  class ReduxBreadcrumbTrail extends Component {
    constructor (props) {
      super(props)
      this.state = props
    }

    componentWillReceiveProps (nextProps) {
      const { location, url } = nextProps
      if (location && location.pathname && location.pathname === url) {
        this.setState(nextProps)
      }
    }

    render () {
      return <Wrapped {...this.state} />
    }
  }

  ReduxBreadcrumbTrail.propTypes = {
    location: shape({
      pathname: string.isRequired
    }),
    url: string
  }

  ReduxBreadcrumbTrail.displayName = `Breadcrumb(${Wrapped.displayName || Wrapped.name || 'Anonymous'})`

  return ReduxBreadcrumbTrail
}
