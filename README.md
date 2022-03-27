# @dimensionalpocket/api-client

[![build](https://github.com/dimensionalpocket/api-client-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/dimensionalpocket/api-client-js/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/dimensionalpocket/api-client-js.svg)](https://lgtm.com/projects/g/dimensionalpocket/api-client-js/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/dimensionalpocket/api-client-js.svg)](https://lgtm.com/projects/g/dimensionalpocket/api-client-js/context:javascript)

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

## Usage

```js
var api = new ApiClient("https://exampleapi.com")

// GET /things?param=1
api.get('/things', {param: 1}).then(response => {})

// POST /things
api.post('/things', {description: 'something'}).then(response => {})

// PATCH /things/1
api.put('/things/1', {description: 'new thing'}).then(response => {})
api.patch('/things/1', {description: 'new thing'}).then(response => {})

// DELETE /things/1
api.delete('/things/1').then(response => {})

// OPTIONS /things/1
api.request('OPTIONS', '/things/1').then(response => {})
```

## License

MIT
