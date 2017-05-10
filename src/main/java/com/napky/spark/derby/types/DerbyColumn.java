package com.napky.spark.derby.types;

public class DerbyColumn {

    private String columnName;
    private String columnDataType;

    public DerbyColumn(String columnName, String columnDataType) {
        this.columnName = columnName;
        this.columnDataType = columnDataType;
    }
    
}
