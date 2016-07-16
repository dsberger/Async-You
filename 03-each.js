var async = require('async')
var http = require('http')

var urls = process.argv.slice(2)

async.each(
  urls,
  function (url, callback) {
    http.get(url, function (res) {
      res.on('data', function (chunk) {
      })

      res.on('end', function () {
        callback(null)
      })
    }).on('error', function (err) {
      callback(err)
    })
  },
  function (err) {
    if (err) { console.log(err) }
  }
)
