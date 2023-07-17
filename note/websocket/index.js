const ws = require('nodejs-websocket')

const port = 9999

let user = 0


var server = ws.createServer(function (conn) {
  // console.log(9, conn)
  user++
  conn.nickname = 'user_' + user
  conn.fd = 'user_' + user
  let message = {
    type: 'enter',
    data: conn.nickname + '进来啦！！'
  }
  broadcast(server, message)
  conn.on('text', function (str) {
    console.log('text', str)
    message.type = 'message'
    message.data = str
    broadcast(server, message)
  })
  conn.on('close', function (code, reason) {
    message.type = 'leave'
    message.data = conn.nickname + '离开了'
    broadcast(server, message)
  })
}).listen(port)

function broadcast(s, msg) {
  console.log(s.connections)
  if (s.connections) {
    s.connections.forEach(function (con) {
      con.sendText(JSON.stringify(msg))
    })
  }
}