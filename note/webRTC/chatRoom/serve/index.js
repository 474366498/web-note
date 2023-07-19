const ws = require('nodejs-websocket')

const port = 9999

const {
  SIGNAL_TYPE_JOIN,
  SIGNAL_TYPE_RESP_JOIN,
  SIGNAL_TYPE_LEAVE,
  SIGNAL_TYPE_NEW_PEER,
  SIGNAL_TYPE_PEER_LEAVE,
  SIGNAL_TYPE_OFFER,
  SIGNAL_TYPE_ANSWER,
  SIGNAL_TYPE_CANDIDATE
} = require('./var')


let user = 0
var roomTableMap = new Map()

var server = ws.createServer(function (conn) {
  // console.log(9, conn)
  user++
  conn.nickname = 'user_' + user
  conn.fd = 'user_' + user
  let message = 'ws 链接进来啦！！'

  broadcast(server, message)
  conn.on('text', function (msg) {
    let jsonMsg = JSON.parse(msg)
    console.log('text', jsonMsg)
    switch (jsonMsg.cmd) {
      case SIGNAL_TYPE_JOIN:
        onHandleJoin(jsonMsg, conn)
        break;
      case SIGNAL_TYPE_LEAVE:
        onHandleLeave(jsonMsg)
        break;
      case SIGNAL_TYPE_OFFER:
        onHandleOffer(jsonMsg)
        break;
      case SIGNAL_TYPE_ANSWER:
        onHandleAnswer(jsonMsg)
        break;
      case SIGNAL_TYPE_CANDIDATE:
        onHandleCandidate(jsonMsg)
        break;
      default:
        break;
    }
    broadcast(server, msg)
  })
  conn.on('close', function (code, reason) {
    message = 'ws 断开啦！！'
    broadcast(server, message)
  })
  conn.on('error', function (error) {
    console.log(30, error)
  })
}).listen(port)

function onHandleJoin(json, ws) {
  let { roomId, uid } = json
  var roomData = roomTableMap.has(roomId) ? roomTableMap.get(roomId) : new Array()

  if (!roomTableMap.has(roomId)) {
    roomTableMap.set(roomId, roomData)
  }
  if (roomData.length > 2) {
    console.warn(roomId + ' : 已经有两人存在，请使用其他房间')
    ws.sendText({ type: 'warning', msg: roomId + ' : 已经有两人存在，请使用其他房间' })
    return null
  }

  roomData.push({
    uid,
    roomId,
    ws
  })
  if (roomData.length > 1) {
    console.log(68, '新加入的', roomData.length)
    for (let item of roomData) {
      console.log(70, item.uid, uid)
      if (item.uid != uid) {

        let jsonMsg = {
          cmd: SIGNAL_TYPE_NEW_PEER,
          remoteUid: uid
        }
        console.log('告诉进房者', jsonMsg)

        item.ws.sendText(JSON.stringify(jsonMsg))
        jsonMsg = {
          cmd: SIGNAL_TYPE_RESP_JOIN,
          remoteUid: item.uid
        }
        console.log('告诉开房者', jsonMsg)

        item.ws.sendText(JSON.stringify(jsonMsg))
      }
    }
  }

  console.log(103, roomTableMap, roomTableMap.size)
}

function onHandleLeave(json) {
  let { roomId, uid } = json
  let roomData = roomTableMap.get(roomId)
  if (!roomData) return
  let index = roomData.findIndex(item => item.uid == uid)
  if (index < 0) return

  roomData.splice(index, 1)
  if (roomData.length >= 1) {
    for (let item of roomData) {
      let jsonMsg = {
        cmd: SIGNAL_TYPE_LEAVE,
        remoteUid: uid
      }
      item.ws.sendText(JSON.stringify(jsonMsg))
    }
  }
}
function onHandleOffer(json) {
  let { roomId, uid, remoteUid } = json

  let roomData = roomTableMap.get(roomId)

  if (!roomData) return

  let remote = roomData.find(item => item.uid == remoteUid)
  if (remote) {
    remote.ws.sendText(JSON.stringify(json))
  } else {
    console.log('对方了??')
  }

}
function onHandleAnswer(json) {
  let { roomId, uid, remoteUid } = json

  let roomData = roomTableMap.get(roomId)

  if (!roomData) return

  let remote = roomData.find(item => item.uid == remoteUid)
  if (remote) {
    remote.ws.sendText(msg)
  } else {
    console.log('对方了??')
  }
}
function onHandleCandidate(json) {
  let { roomId, uid, remoteUid } = json

  let roomData = roomTableMap.get(roomId)

  if (!roomData) return

  let remote = roomData.find(item => item.uid == remoteUid)
  if (remote) {
    remote.ws.sendText(msg)
  } else {
    console.log('对方了??')
  }
}


function broadcast(s, msg) {
  if (s.connections) {
    s.connections.forEach(function (con) {
      con.sendText(JSON.stringify(msg))
    })
  }
}