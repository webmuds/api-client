'use strict'

import { expect } from 'chai'

import ApiClient from '../index.js'
import { ApiClient as ApiClientFromSrc } from '../src/ApiClient.js'

describe('ApiClient', function () {
  it('loads ApiClient from /src', function () {
    expect(ApiClient).to.eq(ApiClientFromSrc)
  })

  describe('#setHeader', function () {
    before(function () {
      this.client = new ApiClient('http://webmuds.test')
      this.client.setHeader('test-Header', 'testValue')
    })

    it('sets a header', function () {
      expect(this.client.instance.defaults.headers.common['test-Header']).to.eq('testValue')
    })
  })
})
