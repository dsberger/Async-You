var async = require('async')
var http = require('http')

var hostname = process.argv[2]
var port = process.argv[3]

async.series({
  create: function (callback) {
    createFiveUsers(callback)
  },
  retrieve: function (callback) {
    getUsers(callback)
  }
}, function (err, results) {
  if (err) { return console.log(err) }
  console.log(results.retrieve)
})

function createFiveUsers (callback) {
  async.times(5, function (n, next) {
    createUser(n + 1, function (err, user) {
      next(err, user)
    })
  }, function (err, users) {
    callback(err, users)
  })
}

function createUser (id, next) {
  var postData = JSON.stringify({
    user_id: id
  })

  var options = {
    hostname: hostname,
    port: port,
    path: '/users/create',
    method: 'POST'
  }

  var req = http.request(options)
  req.write(postData)
  req.end()

  next()
}

function getUsers (callback) {
  var body = ''

  http.get(`http://${hostname}:${port}`, function (res) {
    res.on('data', function (chunk) {
      body += chunk.toString()
    })
    res.on('end', function () {
      callback(null, body)
    })
  })
}
