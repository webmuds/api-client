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
    this.returnBody = true
  }

  get (path, params, config = null) {
    if (params) {
      path = `${path}${qs.stringify(params, this.qsOptions)}`
    }

    var result = this
      .instance
      .get(path, config)

    if (this.returnBody) {
      result = result.then(responseData)
    }

    return result
  }

  post (path, data, config = null) {
    var result = this
      .instance
      .post(path, data, config)

    if (this.returnBody) {
      result = result.then(responseData)
    }

    return result
  }

  put (path, data, config = null) {
    return this.patch(path, data, config)
  }

  patch (path, data, config = null) {
    var result = this
      .instance
      .patch(path, data, config)

    if (this.returnBody) {
      result = result.then(responseData)
    }

    return result
  }

  delete (path, config = null) {
    var result = this
      .instance
      .delete(path, config)

    if (this.returnBody) {
      result = result.then(responseData)
    }

    return result
  }

  request (method, url, data, config = null) {
    var result = this
      .instance
      .request({ method, data, url, config })

    if (this.returnBody) {
      result = result.then(responseData)
    }

    return result
  }

  setHeader (headerName, headerValue) {
    this.instance.defaults.headers.common[headerName] = headerValue
  }
}

function responseData (response) {
  return response.data
}
