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
}, logResult)

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

function logResult (err, result) {
  if (err) { return console.log(err) }
  console.log(result)
}
