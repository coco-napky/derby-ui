import axios from 'axios';

let api = {};

api.post = (url, data) => axios.post(url, data);
api.get = url => axios.get(url);

export default api;