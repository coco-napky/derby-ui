/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.napky.spark.derby;

import static spark.Spark.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSetMetaData;

/**
 *
 * @author napky
 */
public class Main {
    
    private static String dbURL = "jdbc:derby:testDb;create=true;";
    private static String tableName = "restaurants";
    // jdbc Connection
    private static Connection conn = null;
    private static Statement stmt = null;
    
    public static void main(String[] args) {
        port(8000);
        createConnection();
        get("/hello", (req, res) -> "Hello World 2");
    }
    
    
    private static void createConnection() {
        try
        {
            Class.forName("org.apache.derby.jdbc.ClientDriver").newInstance();
            //Get a connection
            conn = DriverManager.getConnection(dbURL); 
        }
        catch (Exception except)
        {
            System.out.println("Failed");
            except.printStackTrace();
        }
    }
}
