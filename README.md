# @dimensionalpocket/api-client

[![build](https://github.com/dimensionalpocket/api-client-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/dimensionalpocket/api-client-js/actions/workflows/node.js.yml)

Generic API client for Node apps to send requests to Rails APIs developed by the studio.

Included:

* [axios](https://github.com/axios/axios)
* [axios-retry](https://github.com/softonic/axios-retry)
* [qs](https://github.com/ljharb/qs)

Opinionated settings:

* Query string format follows Rails conventions
* PUT is not supported: there's a `put` method but it's converted to PATCH
* Timeout defaults to 45 seconds to account for APIs hosted on Heroku
  * Can be overwritten in the constructor
* It returns the `body` of the response.
  * If you want to return the full `response` object from Axios instead, set `api.returnBody = false`.

## Usage

```js
var api = new ApiClient("https://exampleapi.com")

// GET /things?param=1
api.get('/things', {param: 1}).then(body => {})

// POST /things
api.post('/things', {description: 'something'}).then(body => {})

// PATCH /things/1
api.put('/things/1', {description: 'new thing'}).then(body => {})
api.patch('/things/1', {description: 'new thing'}).then(body => {})

// DELETE /things/1
api.delete('/things/1').then(body => {})

// OPTIONS /things/1
api.request('OPTIONS', '/things/1').then(body => {})
```

Other workflows (such as error capture) follow Axios conventions.

## License

MIT
