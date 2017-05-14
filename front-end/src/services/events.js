var events = require('events');
var emitter = new events.EventEmitter();

let api = {};

api.on = (...args) => emitter.on(...args);
api.emit = (...args) => emitter.emit(...args);

export default api;