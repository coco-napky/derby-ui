let store = require('store');

let service = {};

service.getSession = () => store.get('session');
service.setSession = data => {
    console.log('setting data')
    store.set('session', data)
    console.log(store.get('session'))
};

export default service;