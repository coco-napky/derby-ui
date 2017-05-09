
package com.napky.spark.derby;

import java.sql.Timestamp;

class DerbyUser {
    public String username;
    public Timestamp lastModified;
    public String hashingScheme;

    DerbyUser(String username, String hashingScheme, Timestamp lastModified) {
        this.username = username;
        this.hashingScheme = hashingScheme;
        this.lastModified = lastModified;
    }   
}
