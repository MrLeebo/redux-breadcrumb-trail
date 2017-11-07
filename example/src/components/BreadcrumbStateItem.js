import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-breadcrumb-trail'
import { save } from '../lib/saveActionCreators'

export class BreadcrumbStateItem extends Component {
  handleSave = () => this.props.save(this.props.breadcrumb)

  handleLoad = () => this.props.reset(this.props.state)

  handleReset = () => this.props.reset()

  render () {
    return (
      <li className='pull-right'>
        Breadcrumb State:
        <button className='btn-link' onClick={this.handleSave}>Save</button>
        <button className='btn-link' onClick={this.handleLoad}>Load</button>
        <button className='btn-link' onClick={this.handleReset}>Reset</button>
      </li>
    )
  }
}

const mapProps = ({ breadcrumb, state }) => ({ breadcrumb, state })
const actions = { save, reset }

export default connect(mapProps, actions)(BreadcrumbStateItem)
