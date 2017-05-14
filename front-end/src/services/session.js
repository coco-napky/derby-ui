let store = require('store');

let service = {};

service.getSession = () => store.get('session');
service.setSession = data => store.set('session', data);
service.clear = data => store.clearAll();

export default service;