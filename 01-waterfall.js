var async = require('async')
var http = require('http')
var fs = require('fs')
var filePath = process.argv[2]

async.waterfall([
  readTheUrlFile,
  getRequestForContents
], function (err, result) {
  if (err) { return console.error(err) }
  console.log(result)
})

function readTheUrlFile (callback) {
  fs.readFile(filePath, function (err, data) {
    if (err) { return callback(err) }
    callback(null, data.toString())
  })
}

function getRequestForContents (url, callback) {
  var body = ''

  http.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })
    res.on('end', function () {
      callback(null, body)
    })
  }).on('error', function (err) {
    callback(err)
  })
}
