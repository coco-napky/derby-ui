import http from './http';
import CONSTANTS from '../constants'; 

let service = {};

service.getTables = () => http.get(`${CONSTANTS.API_URL}/get-tables`)
service.queryTable = (schema, tableName, where, compare) => {
    let url = `${CONSTANTS.API_URL}/query-table?schema=${schema}&tableName=${tableName}`;

    if(where)
        url += `&where=${where}&compare=${compare}`;
    return http.get(url);
}

service.getTriggers = () => service.queryTable('sys', 'systriggers');
service.getStatements = () => service.queryTable('sys', 'sysstatements'); 

export default service;