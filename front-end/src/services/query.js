import http from './http';
import CONSTANTS from '../constants'; 

let service = {};

service.getTables = () => http.get(`${CONSTANTS.API_URL}/get-tables`)

export default service;