import http from './http';
import CONSTANTS from '../constants'; 

let service = {};

service.getTables = (where,compare) => {
    let url = `${CONSTANTS.API_URL}/get-tables`;

    if(where)
        url += `?where=${where}&compare=${compare}`;

    return http.get(url);
}
service.queryTable = (schema, tableName, where, compare) => {
    let url = `${CONSTANTS.API_URL}/query-table?schema=${schema}&tableName=${tableName}`;

    if(where)
        url += `&where=${where}&compare=${compare}`;
    return http.get(url);
}

service.getTriggers = () => service.queryTable('sys', 'systriggers');
service.getStatements = () => service.queryTable('sys', 'sysstatements'); 
service.getIndexes = () => service.queryTable('sys', 'SYSCONGLOMERATES', 'isindex', true); 
service.getUsers = () => http.get(`${CONSTANTS.API_URL}/get-users`);
service.getConstraints = () => service.queryTable('sys', 'sysconstraints');
service.getTriggers = () => service.queryTable('sys', 'systriggers');
export default service;