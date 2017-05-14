package com.napky.spark.derby;

import java.util.ArrayList;

class TableQuery {
    public String tableName;
    public ArrayList<String> columns;
    public String schema;
    
    public TableQuery(String tableName, ArrayList<String> columns, String schema) {
        this.tableName = tableName;
        this.columns = columns;
        this.schema = schema;
    }
}
