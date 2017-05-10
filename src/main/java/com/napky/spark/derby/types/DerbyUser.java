
package com.napky.spark.derby.types;
import java.sql.Timestamp;

public class DerbyUser {
    public String username;
    public Timestamp lastModified;
    public String hashingScheme;

    public DerbyUser(String username, String hashingScheme, Timestamp lastModified) {
        this.username = username;
        this.hashingScheme = hashingScheme;
        this.lastModified = lastModified;
    }   
}
