/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.napky.spark.derby;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import static spark.Spark.*;
/**
 *
 * @author napky
 */
public class Main {
    public static Gson gson;
    public static void main(String[] args) {
        
        gson = new Gson();
        DerbyApi.init();
        port(8000);
        
        CorsFilter.apply();
        
        get("/get-databases", "application/json", (req, res) -> {
            return gson.toJson(DerbyApi.getDatabases());
        });
        
        get("/create-database", "application/json", (req, res) -> {
            String name = req.queryParams("name");
            
            if(name == null)
                return "Database name cannot be null";
            return gson.toJson(DerbyApi.createDb(name));
        });
        
        get("/login", "application/json", (req, res) -> {
            String name = req.queryParams("name");
            String username = req.queryParams("user");
            String password = req.queryParams("password");
            
            if(name == null)
                return "Database name cannot be null";
            
            if(username == null)
                return "Username cannot be null";
            
            if(password == null)
                return "Password cannot be null";
            
            return gson.toJson(DerbyApi.login(name, username, password));
        });
        
        get("/logout", "application/json", (req, res) -> {
            String name = req.queryParams("name");
            String username = req.queryParams("user");
            String password = req.queryParams("password");
            
            if(name == null)
                return "Database name cannot be null";
            
            if(username == null)
                return "Username cannot be null";
            
            if(password == null)
                return "Password cannot be null";
            
            return gson.toJson(DerbyApi.logout(name, username, password));
        });
        
        get("/7", "application/json", (req, res) -> {
            
            String username = req.queryParams("user");
            String password = req.queryParams("password");
            
            if(username == null)
                return "Username cannot be null";
            
            if(password == null)
                return "Password cannot be null";
            
            return gson.toJson(DerbyApi.createUser(username, password));
        });

        get("/update-password", "application/json", (req, res) -> {
            
            String username = req.queryParams("user");
            String password = req.queryParams("password");
            
            if(username == null)
                return "Username cannot be null";
            
            if(password == null)
                return "Password cannot be null";
            
            return gson.toJson(DerbyApi.updatePassword(username, password));
        });
        
        get("/remove-user", "application/json", (req, res) -> {
            String username = req.queryParams("user");
            
            if(username == null)
                return "Username cannot be null";
            
            return gson.toJson(DerbyApi.removeUser(username));
        });
        
        get("/get-tables", "application/json", (req, res) -> {
            String schema = req.queryParams("schema");
            String where = req.queryParams("where");
            String compare = req.queryParams("compare");
            
            return gson.toJson(DerbyApi.getTables(schema, where, compare));
        });
        
        get("/query-table", "application/json", (req, res) -> {
            
            String schema = req.queryParams("schema");
            String tableName = req.queryParams("tableName");
            String where = req.queryParams("where");
            String compare = req.queryParams("compare");
            TableQuery query = new TableQuery(tableName, null, schema, where, compare);
            
            return gson.toJson(DerbyApi.queryTable(query));
        });
        
        get("/get-users", "application/json", (req, res) -> gson.toJson(DerbyApi.getUsers()));
        
    }
}