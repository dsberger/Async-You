var async = require('async')
var http = require('http')
var url = require('url').parse(process.argv[2])
var numbers = ['one', 'two', 'three']

async.reduce(numbers, 0, getNumberValue, logResult)

function getNumberValue (memo, number, callback) {
  url.query = {'number': number}
  var value

  http.get(url.format(), function (res) {
    res.on('data', function (chunk) {
      value = parseInt(chunk.toString(), 10)
    })
    res.on('end', function () {
      callback(null, memo + value)
    })
  })
}

function logResult (err, result) {
  if (err) { return console.log(err) }
  console.log(result)
}
