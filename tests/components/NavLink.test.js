/* global $subject */
import assert from 'assert'
import React from 'react'
import { mount } from 'enzyme'
import NavLink from '../../lib/components/NavLink'

describe('NavLink', () => {
  describe('with string', () => {
    subject(() => mount(<NavLink to='/about' />))

    it('should render', () => {
      assert.deepEqual($subject.find('Link').prop('to'), { pathname: '/about', state: { breadcrumb: 'reset' } })
    })
  })

  describe('with object', () => {
    subject(() => mount(<NavLink to={{ pathname: '/about' }} />))

    it('should render', () => {
      assert.deepEqual($subject.find('Link').prop('to'), { pathname: '/about', state: { breadcrumb: 'reset' } })
    })
  })
})
