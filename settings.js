module.exports = {
  adminAuth: require('./mqtt-auth').setup({
    brokerHost: 'mqtt://localhost:1883'
  })
}
