import http from './http';
import CONSTANTS from '../constants'; 

let service = {};

service.login = (database, user, password) => 
    http.get(`${CONSTANTS.API_URL}/login?name=${database}&user=${user}&password=${password}`)

export default service;