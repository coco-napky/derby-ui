/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.napky.spark.derby;

import com.google.gson.Gson;
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
        
        get("/create-user", "application/json", (req, res) -> {
            
            String username = req.queryParams("user");
            String password = req.queryParams("password");
            
            if(username == null)
                return "Username cannot be null";
            
            if(password == null)
                return "Password cannot be null";
            
            return gson.toJson(DerbyApi.createUser(username, password));
        });
        
        get("/remove-user", "application/json", (req, res) -> {
            String username = req.queryParams("user");
            
            if(username == null)
                return "Username cannot be null";
            
            return gson.toJson(DerbyApi.removeUser(username));
        });
        
        get("/get-users", "application/json", (req, res) -> gson.toJson(DerbyApi.getUsers()));
        
    }
}