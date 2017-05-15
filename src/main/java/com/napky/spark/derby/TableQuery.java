package com.napky.spark.derby;

import java.util.ArrayList;

class TableQuery {
    public String tableName;
    public ArrayList<String> columns;
    public String schema;
    public String compare;
    public String where;
    
    public TableQuery(String tableName, ArrayList<String> columns, String schema, String where, String compare) {
        this.tableName = tableName;
        this.columns = columns;
        this.schema = schema;
        this.where = where;
        this.compare = "'" + compare + "'";
    }
}
