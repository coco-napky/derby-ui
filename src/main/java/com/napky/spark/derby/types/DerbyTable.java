package com.napky.spark.derby.types;

import java.util.ArrayList;

public class DerbyTable {

    public String identifier;
    public String schemaId;
    public String tableId;
    public String schemaName;
    public ArrayList<DerbyColumn> columns;
    
    public DerbyTable(String identifier, String schemaId, String schemaName, String tableId) {
        this.identifier = identifier;
        this.schemaName = schemaName;
        this.schemaId = schemaId;
        this.tableId = tableId;
        this.columns = new ArrayList<>();
    }

    public void addColumn(DerbyColumn column) {
        columns.add(column);
    }
    
}
