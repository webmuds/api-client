'use strict'

import axios from 'axios'
import axiosRetry from 'axios-retry'
import qs from 'qs'

export class ApiClient {
  constructor (baseUrl, timeout = null) {
    timeout = timeout || 10000
    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: timeout,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
    axiosRetry(this.instance, { retries: 1 })
    this.qsOptions = {
      encodeValuesOnly: true,
      addQueryPrefix: true
    }
  }

  get (path, params) {
    if (params) {
      path = `${path}${qs.stringify(params, this.qsOptions)}`
    }
    return this.instance.get(path).then(response => response.data)
  }

  post (path, data) {
    return this.instance.post(path, data).then(response => response.data)
  }

  put (path, data) {
    return this.instance.put(path, data).then(response => response.data)
  }

  patch (path, data) {
    return this.instance.patch(path, data).then(response => response.data)
  }

  delete (path) {
    return this.instance.delete(path).then(response => response.data)
  }

  request (method, url, data) {
    return this.instance.request({ method, data, url }).then(response => response.data)
  }
}
