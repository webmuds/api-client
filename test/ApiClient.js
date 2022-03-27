'use strict'

import { expect } from '@dimensionalpocket/development'
import Nock from 'nock'

import ApiClient from '../index.js'
import { ApiClient as ApiClientFromSrc } from '../src/ApiClient.js'

const BASE_URL = 'http://example.test'

describe('ApiClient', function () {
  it('loads ApiClient from /src', function () {
    expect(ApiClient).to.eq(ApiClientFromSrc)
  })

  describe('#setHeader', function () {
    before(function () {
      this.client = new ApiClient(BASE_URL)
      this.client.setHeader('test-Header', 'testValue')
    })

    it('sets a header', function () {
      expect(this.client.instance.defaults.headers.common['test-Header']).to.eq('testValue')
    })
  })

  describe('#get', function () {
    before(async function () {
      this.scope = Nock(BASE_URL).get('/things').reply(200, { success: true })
      this.api = new ApiClient(BASE_URL)
      this.body = await this.api.get('/things')
    })

    after(function () {
      this.scope.done()
    })

    it('returns the correct body', function () {
      expect(this.body.success).to.eq(true)
    })
  })
})
