/* global $subject */
import assert from 'assert'
import React from 'react'
import { mount } from 'enzyme'
import BreadcrumbItem from '../../lib/components/BreadcrumbItem'

describe('BreadcrumbItem', () => {
  subject(() => props => mount(<BreadcrumbItem itemRenderer='li' {...props} />))

  it('should render', () => {
    const result = $subject({ component: 'About', current: true })

    assert.equal(result.find('li').text(), 'About')
    assert.equal(result.find('a').length, 0)
  })

  it('should allow tag renderer', () => {
    const result = $subject({ itemRenderer: 'div', component: 'About', current: true })

    assert.equal(result.find('div').text(), 'About')
    assert.equal(result.find('a').length, 0)
  })

  it('should linkify non-current', () => {
    const result = $subject({ component: 'About', current: false })

    assert.equal(result.find('li a').text(), 'About')
  })

  it('should allow stateless component renderer', () => {
    const result = $subject({ itemRenderer: props => <span>{props.children}</span>, component: () => <i>About</i>, current: false })

    assert.equal(result.find('span a i').text(), 'About')
  })
})
