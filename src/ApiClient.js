'use strict'

import axios from 'axios'
import axiosRetry from 'axios-retry'
import qs from 'qs'

export class ApiClient {
  constructor (baseUrl, timeout = null) {
    timeout = timeout || 45000
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
    this.retry = axiosRetry(this.instance, { retries: 1 })
    this.qsOptions = {
      encodeValuesOnly: true,
      addQueryPrefix: true
    }
  }

  get (path, params, config = null) {
    if (params) {
      path = `${path}${qs.stringify(params, this.qsOptions)}`
    }
    return this
      .instance
      .get(path, config)
      .then(responseData)
  }

  post (path, data, config = null) {
    return this
      .instance
      .post(path, data, config)
      .then(responseData)
  }

  put (path, data, config = null) {
    return this.patch(path, data, config)
  }

  patch (path, data, config = null) {
    return this
      .instance
      .patch(path, data, config)
      .then(responseData)
  }

  delete (path, config = null) {
    return this
      .instance
      .delete(path, config)
      .then(responseData)
  }

  request (method, url, data, config = null) {
    return this
      .instance
      .request({ method, data, url, config })
      .then(responseData)
  }

  setHeader (headerName, headerValue) {
    this.instance.defaults.headers.common[headerName] = headerValue
  }
}

function responseData (response) {
  return response.data
}
