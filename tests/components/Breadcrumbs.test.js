/* global $subject, $breadcrumb, $dispatch */
import assert from 'assert'
import React from 'react'
import { mount } from 'enzyme'
import { spy } from 'sinon'
import { Breadcrumbs, separatorRenderer, mapStateToProps } from '../../lib/components/Breadcrumbs'

describe('BreadcrumbItem', () => {
  subject(() => props => {
    const component = <Breadcrumbs breadcrumb={$breadcrumb} dispatch={$dispatch} {...props} />
    return mount(component, { lifecycleExperimental: true })
  })

  def('breadcrumb', () => ({ breadcrumbs: [] }))
  def('dispatch', spy)

  it('should render default separator', () => {
    const Renderer = separatorRenderer

    assert.equal(mount(<Renderer />).find('li').text(), '>')
  })

  it('should map state to props', () => {
    const result = mapStateToProps({ a: true, breadcrumb: $breadcrumb, c: {} })

    assert.deepEqual(result, { breadcrumb: $breadcrumb })
  })

  describe('with no breadcrumbs', () => {
    it('should render nothing', () => {
      assert.equal($subject().get(), undefined)
      assert($dispatch.notCalled)
    })

    it('should dispatch location on mount', () => {
      $subject({ routes: [{}], location: { url: '/about' } })

      assert($dispatch.calledOnce)
    })

    it('should dispatch location on receive props', () => {
      const result = $subject()

      result.setProps({ dispatch: $dispatch, routes: [{}], location: { url: '/about' } })
      assert($dispatch.calledOnce)
    })
  })

  describe('with one breadcrumb', () => {
    def('breadcrumb', () => ({ breadcrumbs: [{}] }))

    it('should render nothing', () => {
      assert.equal($subject().get(), undefined)
    })
  })

  describe('with two breadcrumbs', () => {
    def('breadcrumb', () => ({
      breadcrumbs: [{ component: 'Home', url: '/' }, { component: 'About', url: '/about' }]
    }))

    it('should render simple breadcrumb', () => {
      const result = $subject()

      assert.equal(result.find('ul').children().length, 3)
    })

    it('should render with custom separator', () => {
      const result = $subject({ separatorRenderer: '/' })

      assert.equal(result.text(), 'Home/About')
    })

    it('should render with custom renderers', () => {
      const result = $subject({ itemRenderer: 'span', listRenderer: 'div', separatorRenderer: <span>-</span> })
      const children = result.find('div').children()

      assert.equal(children.length, 3)
    })

    it('should render with component renderers', () => {
      const result = $subject({ itemRenderer: props => <li>{props.children}</li>, listRenderer: props => <ol>{props.children}</ol> })
      const children = result.find('listRenderer').children()

      assert.equal(children.length, 3)
    })

    it('should passthru other props to list', () => {
      const result = $subject({ className: 'list-unstyled' })

      assert.equal(result.find('ul').prop('className'), 'list-unstyled')
    })
  })
})
