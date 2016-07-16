var async = require('async')
var http = require('http')
var urlOne = process.argv[2]
var urlTwo = process.argv[3]

async.series({
  requestOne: function (callback) {
    fetchUrl(urlOne, callback)
  },
  requestTwo: function (callback) {
    fetchUrl(urlTwo, callback)
  }
}, function (err, results) {
  if (err) { return console.error(err) }
  console.log(results)
})

function fetchUrl (url, callback) {
  var body = ''

  http.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })
    res.on('end', function () {
      callback(null, body)
    })
  })
}
