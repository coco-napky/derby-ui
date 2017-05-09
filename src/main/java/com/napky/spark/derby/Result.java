package com.napky.spark.derby;

public class Result {

    public boolean status;
    public String message;
    public Object data;
    
    Result(boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    Result(boolean status, String message, Object data) {
        this(status,message);
        this.data = data;
    }
    
}
