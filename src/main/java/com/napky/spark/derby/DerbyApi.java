package com.napky.spark.derby;

import com.napky.spark.derby.types.DerbyColumn;
import com.napky.spark.derby.types.DerbyTable;
import com.napky.spark.derby.types.DerbyUser;
import java.io.File;
import java.io.FilenameFilter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLNonTransientConnectionException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

public class DerbyApi {
    
    private static Connection conn = null;
    private final static String baseUrl = "jdbc:derby:";
    private static HashMap<UUID, Statement> statements;
    
    public static void init() {
        try {
            if(statements == null)
                statements = new HashMap<>();
            setSystemHome();
            Class.forName("org.apache.derby.jdbc.ClientDriver").newInstance();
        } catch (ClassNotFoundException | IllegalAccessException | InstantiationException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private static void setSystemHome() {
        String systemDirectory = System.getProperty("user.dir") + "\\dbs";
        Properties p = System.getProperties();
        p.setProperty("derby.system.home", systemDirectory);
        System.out.println("Derby System Home set to: " + systemDirectory);
    }
    
    public static Result createDb(String name) {
        try {
            String dbUrl = baseUrl + name + ";create=true;";
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
    
    public static Result login(String name, String user, String password) {
        String dbUrl = baseUrl + name + ";deregister=false;";
        try {
            conn = connect(dbUrl, user, password);
        } catch (SQLException ex) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, ex);
            return new Result(false, ex.getMessage());
        }
        return new Result(true, "Login Success");
    }

    public static Result logout(String name, String user, String password) {
        String dbUrl = baseUrl + name + ";shutdown=true;";
        
        try {
            conn = connect(dbUrl, user, password);
            return new Result(true, "User logged out");
        } catch (SQLException ex) {
            return new Result(true, ex.getMessage());
        } catch (Exception e) {
            return new Result(false, "User log out fail");
        }
    }
    
    private static Connection connect(String dbUrl, String user, String password) throws SQLException {
        return DriverManager.getConnection(dbUrl, user, password);
    }

    private static void execute(String sql) throws SQLException, Exception {
        if(conn == null)
            throw new Exception("Execution failed, no connection stablished");
        PreparedStatement statement = conn.prepareCall(sql);
        statement.execute();
        statement.close();
        conn.commit();
    }

    static Result getUsers() {
        ArrayList<DerbyUser> users = new ArrayList<>();
        try {
            String sql = "select username, HASHINGSCHEME, LASTMODIFIED "
                    + "from sys.sysusers";
            
            UUID index = java.util.UUID.randomUUID();
            ResultSet result = executeQuery(sql, index);
            while (result.next()) {
                String username = result.getString("USERNAME");
                String hashingScheme = result.getString("HASHINGSCHEME");
                Timestamp lastModified = result.getTimestamp("LASTMODIFIED");
                users.add(new DerbyUser(username, hashingScheme, lastModified));
            }
            closeStatement(index);
        } catch (Exception e) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, e);
            return new Result(false, e.getMessage());
        }
        
        return new Result(true, "", (Object)users);
    }

    private static ResultSet executeQuery(String sql, UUID index) throws Exception {
        if(conn == null)
            throw new Exception("Execution failed, no connection stablished");
        Statement statement = conn.createStatement();
        ResultSet result = statement.executeQuery(sql);
        statements.put(index, statement);
        return result;
    }

    private static Statement getStatement(UUID index) {
        return statements.get(index);
    }

    private static void closeStatement(UUID index) throws SQLException {
        Statement statement = getStatement(index);
        statement.close();
        statements.remove(index);
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
    
    static Result removeUser(String username) {
        String sql ="CALL SYSCS_UTIL.SYSCS_DROP_USER('"+ username +"')";
        try {
            execute(sql);
            return new Result(true, "User dropped successfully"); 
        } catch (Exception ex) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, ex);
            return new Result(false, ex.getMessage());
        }
    }

    static Result updatePassword(String username, String password) {
        String sql = "CALL SYSCS_UTIL.SYSCS_RESET_PASSWORD('" 
                + username + "', '" + password + "')";
        try {
            execute(sql);
            return new Result(true, "User updated successfully"); 
        } catch (Exception ex) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, ex);
            return new Result(false, ex.getMessage());
        }
    }

    static Result getTables(String schema) {
        String sql = "select * from sys.systables t "
                + "join sys.syscolumns c on t.tableid = c.referenceid "
                + "join sys.sysschemas s on s.schemaid = t.schemaid ";
        
        HashMap<String,DerbyTable> tables = new HashMap<String, DerbyTable>();
        
        UUID index = java.util.UUID.randomUUID();
        try {
            ResultSet result = executeQuery(sql, index);
            while (result.next()) {
                String schemaId = result.getString("SCHEMAID");
                String schemaName = result.getString("SCHEMANAME");
                String tableId = result.getString("TABLEID");
                String tableName = result.getString("TABLENAME");
                String columnName = result.getString("COLUMNNAME");
                String columnDataType = result.getString("COLUMNDATATYPE");
                
                String identifier = schemaName + "." + tableName;
                
                if(tables.containsKey(identifier)) {
                    DerbyTable table = tables.get(identifier);
                    table.addColumn(new DerbyColumn(columnName, columnDataType));
                } else {
                    DerbyTable table = new DerbyTable(identifier, schemaId, schemaName, tableId);
                    tables.put(identifier, table);
                }
                
                
            }
            closeStatement(index);
        } catch (Exception e) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, e);
            return new Result(false, e.getMessage());
        }
        return new Result(true, "", (Object)tables);  
    }

    static Result getDatabases() {
        String systemDirectory = System.getProperty("user.dir") + "\\dbs";
        File file = new File(systemDirectory);
        String[] directories = file.list(new FilenameFilter() {
          @Override
          public boolean accept(File current, String name) {
            return new File(current, name).isDirectory();
          }
        });
        return new Result(true, "", directories);
    }

    static Result queryTable(TableQuery query) {
        String sql = "select " + delimit(query.columns) 
                + " from " + query.schema + "." + 
                query.tableName;
        
        if(query.where != null)
            sql += " where " + query.where + " = " + query.compare;
        
        ResultSet resultSet;
        JSONArray json;
        ArrayList<HashMap<String, String>> data = new ArrayList<>();
        
        UUID index = java.util.UUID.randomUUID();
        try {
            resultSet = executeQuery(sql, index);
            json = ResultSetSerializer.convertResultSetIntoJSON(resultSet);
            closeStatement(index);
        } catch (Exception e) {
            Logger.getLogger(DerbyApi.class.getName()).log(Level.SEVERE, null, e);
            return new Result(false, e.getMessage());
        }
        return new Result(true, "", json);
    }

    private static String delimit(ArrayList<String> columns) {
        String delimitted = "";
        if(columns == null || columns.size() == 0)
           return "*";
        
        for(int i = 0; i < columns.size(); ++i) {
            delimitted += columns.get(i);
            
            if(i != columns.size() - 1)
                delimitted += ",";
        }
        return delimitted;
    }

}
