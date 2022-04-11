const mqtt = require('mqtt')

let brokerHost = null
const options = {
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 0
}

module.exports = {
  type: 'credentials',
  sessionExpiryTime: 60 * 60,
  setup: function (args) {
    brokerHost = args.brokerHost
    return this
  },
  users: function (username) {
    return new Promise(function (resolve) {
      const user = { username: username, permissions: '*' }
      resolve(user)
    })
  },
  authenticate: function (username, password) {
    return new Promise(function (resolve) {
      console.log('Attempting MQTT authentication')
      options.username = username
      options.password = password
      const client = mqtt.connect(brokerHost, options)
      client.on('connect', () => {
        console.log('connected')
        client.end()
        const user = { username: username, permissions: '*' }
        resolve(user)
      })
      client.on('error', error => {
        if (error) {
          console.error(error)
          resolve(null)
        }
      })
    })
  },
  default: function () {
    return new Promise(function (resolve) {
      // Resolve with the user object for the default user.
      // If no default user exists, resolve with null.
      resolve(null)
    })
  }
}
