package com.napky.spark.derby;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DerbyApi {
    
    private static Connection conn = null;
    
    public static void init() {
        try {
            Class.forName("org.apache.derby.jdbc.ClientDriver").newInstance();
        } catch (ClassNotFoundException | IllegalAccessException | InstantiationException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static Result createDb(String name) {
        try {
            String dbUrl = "jdbc:derby:dbs/" + name + ";create=true";
            conn = connect(dbUrl, "admin", "admin"); 
            
            String sql = "call SYSCS_UTIL.SYSCS_CREATE_USER('admin', 'admin' )";
            execute(sql);
            if(conn != null)
                conn.close();
            
           conn = null;
           return new Result(true, "Database created successfully");
        } catch (Exception ex) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, ex);
            return new Result(false, ex.getMessage());
        }
    }
    
    public static Result createUser(String user, String password) {
        
            String sql = "call SYSCS_UTIL.SYSCS_CREATE_USER('" 
                    + user + "', '" + password + "')";
        try {
            execute(sql);
            return new Result(true, "User created successfully"); 
        } catch (Exception ex) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, ex);
            return new Result(false, ex.getMessage());
        }
    }
    
    public static Result LogIn(String name, String user, String password) {
        String dbUrl = "jdbc:derby:dbs/" + name + ";";
        conn = connect(dbUrl, user, password);
        
        return conn == null ? 
                new Result(false, "Login Fail") : 
                new Result(false, "Login Success");
    }
    
    private static Connection connect(String dbUrl, String user, String password) {
        try
        {
            return DriverManager.getConnection(dbUrl, user, password);
        }
        catch (Exception except)
        {
            except.printStackTrace();
            return null;
        }
    }

    private static void execute(String sql) throws SQLException {
        PreparedStatement statement = conn.prepareCall(sql);
        statement.execute();
        conn.commit();
    }
}
