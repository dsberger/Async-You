var async = require('async')
var http = require('http')

var urls = process.argv.slice(2)

async.map(
  urls,
  function (url, callback) {
    var body = ''

    http.get(url, function (res) {
      res.on('data', function (chunk) {
        body += chunk.toString()
      })
      res.on('end', function () {
        return callback(null, body)
      })
    }).on('error', function (err) {
      callback(err)
    })
  },
  function (err, results) {
    if (err) { return console.log(err) }
    console.log(results)
  }
)
