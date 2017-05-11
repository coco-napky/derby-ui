import http from './http';
import CONSTANTS from '../constants'; 

let api = {};

api.getDatabases = () => http.get(`${CONSTANTS.API_URL}/get-databases`);
api.createDatabase = name => http.get(`${CONSTANTS.API_URL}/create-database?name=${name}`);

export default api;