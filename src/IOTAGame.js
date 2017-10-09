var Peer = require('simple-peer')

class IOTAGame {
    constructor(opts) {
        var defaults = {
            provider: ''
        }
        var options = Object.assign({}, defaults, opts)
    }
    
    startGame() {
        var p = new Peer({ initiator: true, trickle: false })
        p.on('error', function (err) { console.log('error', err) })

        p.on('signal', function (data) {
          console.log('SIGNAL', JSON.stringify(data))
        })
        
        p.on('connect', function () {
          console.log('CONNECT')
          p.send('whatever' + Math.random())
        })
        
        p.on('data', function (data) {
          console.log('data: ' + data)
        })
        
        this.peer = p
    }
}