const Exchange = require('peer-exchange');
const wrtc = require('wrtc');
const p2p = new Exchange('uNode', { wrtc: wrtc });
const getLatestBlock = require('./chain/ChainManager.js').getLatestBlock;

const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2
}

function queryChainLengthMsg() {
  return {
    type: MessageType.QUERY_LATEST
  }
}

function queryAllMsg() {
  return {
    type: MessageType.QUERY_ALL
  }
}

function responseChainMsg(blockchain) {
  return {
    type: MessageType.RESPONSE_BLOCKCHAIN, 
    data: JSON.stringify(blockchain)
  }
}

function responseLatestMsg(blockchain) {
  return {
    type: MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify([getLatestBlock(blockchain)])
  }
}

function write(ws, message) {
  return ws.send(JSON.stringify(message));
}

function broadcast(message) {
  return sockets.forEach(socket => write(socket, message));
}

module.exports = p2p;