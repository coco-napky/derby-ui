let store = require('store');

let service = {};

service.getSession = () => store.get('session');
service.setSession = data => store.get('session', data);

export default service;