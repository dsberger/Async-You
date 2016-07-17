var async = require('async')
var http = require('http')

var url = require('url').parse(process.argv[2])

var count = 0
var secretWord = ''

async.whilst(isItMeerkat, getANewWord, logCount)

function isItMeerkat () {
  return secretWord !== 'meerkat'
}

function getANewWord (callback) {
  var body = ''
  http.get(url, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })
    res.on('end', function () {
      count++
      secretWord = body
      callback(null, count)
    })
  }).on('error', callback)
}

function logCount (err, count) {
  if (err) { return console.log(err) }
  console.log(count)
}
