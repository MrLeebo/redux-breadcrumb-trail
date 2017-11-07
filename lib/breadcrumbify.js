import React, { Component } from 'react'
import { shape, string } from 'prop-types'

export default function breadcrumbify (Wrapped) {
  return class ReduxBreadcrumbTrail extends Component {
    static propTypes = {
      location: shape({ pathname: string.isRequired }),
      url: string
    }

    static displayName = `Breadcrumb(${Wrapped.displayName || Wrapped.name || 'Anonymous'})`

    constructor (props) {
      super(props)
      this.state = props
    }

    componentWillReceiveProps (nextProps) {
      const { location, url } = nextProps
      const locationUrl = (location && (location.pathname + (location.search || ''))) || ''

      if (locationUrl === url) {
        this.setState(nextProps)
      }
    }

    render () {
      return <Wrapped {...this.state} />
    }
  }
}
