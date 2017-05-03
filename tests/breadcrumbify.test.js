/* global $subject, $component */
import assert from 'assert'
import React from 'react'
import { mount } from 'enzyme'
import breadcrumbify from '../lib/breadcrumbify'

describe('breadcrumbify', () => {
  subject(() => {
    const TestHarness = breadcrumbify($component)
    return mount(<TestHarness title='fizzbuzz' />)
  })

  def('component', () => function TestBreadcrumb (props) { return <span>{props.title}</span> })

  function assertText (expected) {
    assert.equal($subject.find('span').text(), expected)
  }

  it('should render', () => assertText('fizzbuzz'))

  describe('with inactive url', () => {
    it('should not change', () => {
      $subject.setProps({ title: 'changed' })
      assertText('fizzbuzz')
    })
  })

  describe('with active url', () => {
    it('should change', () => {
      $subject.setProps({ title: 'changed', location: { pathname: '/posts' }, url: '/posts' })
      assertText('changed')
    })
  })

  it('should change with active query string', () => {
    $subject.setProps({ title: 'qs', location: { pathname: '/posts', search: '?sort=asc' }, url: '/posts?sort=asc' })
    assertText('qs')
  })

  describe('display name', () => {
    function assertDisplayName (expected) {
      assert.equal($subject.name(), expected)
    }

    it('should get wrapped component by name', () => {
      assertDisplayName('Breadcrumb(TestBreadcrumb)')
    })

    it('should get wrapped component by display name', () => {
      $component.displayName = 'FizzBuzz'
      assertDisplayName('Breadcrumb(FizzBuzz)')
    })

    it('should get anonymous wrapped component', () => {
      delete $component.name
      assertDisplayName('Breadcrumb(Anonymous)')
    })
  })
})
