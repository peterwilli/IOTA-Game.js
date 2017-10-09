var Peer = require('simple-peer')
var EventEmitter = require('eventemitter3')

module.exports = class IOTAGame {
    constructor(opts) {
        var defaults = {
            provider: ''
        }
        var options = Object.assign({}, defaults, opts)
        this.events = new EventEmitter()
    }
    
    _initPeer(initiator) {
        var p = new Peer({ initiator: initiator, trickle: false }) 
        var _this = this 
        p.on('signal', function (data) { 
          _this.events.emit('signal', data) 
        })
 
        this.peer = p
    }

    joinGame() {
        this._initPeer(false)
    }
    
    startGame() {
        this._initPeer(true)
    }
    
    // Event emitter overrides
    on(eventName, fn) {
        this.events.on(eventName, fn, this)
    }
    
    once(eventName, fn) { 
        this.events.once(eventName, fn, this) 
    }
    
    off(eventName, fn) {
        this.events.removeListener(eventName, fn)
    }
}