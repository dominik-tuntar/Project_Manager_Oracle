package dtuntar.projects.projectManager.service;

import jakarta.annotation.PostConstruct;
import org.hibernate.dialect.OracleTypes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.sql.Types;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProcedureService {
    private final JdbcTemplate jdbcTemplate;
    private SimpleJdbcCall GETALLUSERSCALL;
    private SimpleJdbcCall GETCUSTOMATTRIBUTESCALL;
    private static SimpleJdbcCall CREATECUSTOMATTRIBUTECALL;
    private static SimpleJdbcCall UPDATECUSTOMATTRIBUTECALL;
    private static SimpleJdbcCall DELETECUSTOMATTRIBUTECALL;
    private static SimpleJdbcCall CREATEUSERCALL;
    private static SimpleJdbcCall UPDATEUSERCALL;
    private static SimpleJdbcCall DISABLEUSERCALL;
    private static SimpleJdbcCall ENABLEUSERCALL;
    private SimpleJdbcCall GETALLCLIENTSCALL;
    private static SimpleJdbcCall CREATECLIENTCALL;
    private static SimpleJdbcCall UPDATECLIENTCALL;
    private static SimpleJdbcCall DELETECLIENTCALL;

    public ProcedureService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void init() {
        this.GETALLUSERSCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GETALLUSERS")
                .declareParameters(
                        new SqlOutParameter("result_cursor", OracleTypes.CURSOR)
                );
        this.GETCUSTOMATTRIBUTESCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GETCUSTOMATTRIBUTES")
                .declareParameters(
                        new SqlOutParameter("result_cursor", OracleTypes.CURSOR),
                        new SqlParameter("table_name", Types.VARCHAR),
                        new SqlParameter("table_row", Types.NUMERIC)
                );
        this.CREATECUSTOMATTRIBUTECALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("CREATECUSTOMATTRIBUTE")
                .declareParameters(
                        new SqlParameter("table_name", Types.VARCHAR),
                        new SqlParameter("table_row", Types.NUMERIC),
                        new SqlParameter("title", Types.VARCHAR),
                        new SqlParameter("content_", Types.VARCHAR)
                );

        this.UPDATECUSTOMATTRIBUTECALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATECUSTOMATTRIBUTE")
                .declareParameters(
                        new SqlParameter("v_id_c_attribute", Types.NUMERIC),
                        new SqlParameter("v_title", Types.VARCHAR),
                        new SqlParameter("v_content_", Types.VARCHAR)
                );

        this.DELETECUSTOMATTRIBUTECALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("DELETECUSTOMATTRIBUTE")
                .declareParameters(
                        new SqlParameter("v_id_c_attribute", Types.NUMERIC)
                );

        this.CREATEUSERCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("CREATEUSER")
                .declareParameters(
                        new SqlParameter("fullname", Types.VARCHAR),
                        new SqlParameter("username", Types.VARCHAR),
                        new SqlParameter("pass_word", Types.VARCHAR)
                );

        this.UPDATEUSERCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATEUSER")
                .declareParameters(
                        new SqlParameter("v_id_employee", Types.NUMERIC),
                        new SqlParameter("v_fullname", Types.VARCHAR),
                        new SqlParameter("v_username", Types.VARCHAR),
                        new SqlParameter("v_pass_word", Types.VARCHAR)
                );

        this.DISABLEUSERCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("DISABLEUSER")
                .declareParameters(
                        new SqlParameter("v_id_employee", Types.NUMERIC)
                );

        this.ENABLEUSERCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("ENABLEUSER")
                .declareParameters(
                        new SqlParameter("v_id_employee", Types.NUMERIC)
                );

        this.GETALLCLIENTSCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("GETALLCLIENTS")
                .declareParameters(
                        new SqlOutParameter("result_cursor", OracleTypes.CURSOR)
                );

        this.CREATECLIENTCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("CREATECLIENT")
                .declareParameters(
                        new SqlParameter("name_", Types.VARCHAR),
                        new SqlParameter("email", Types.VARCHAR)
                );

        this.UPDATECLIENTCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("UPDATECLIENT")
                .declareParameters(
                        new SqlParameter("v_id_client", Types.NUMERIC),
                        new SqlParameter("v_name_", Types.VARCHAR),
                        new SqlParameter("v_email", Types.VARCHAR)
                );

        this.DELETECLIENTCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("DELETECLIENT")
                .declareParameters(
                        new SqlParameter("v_id_client", Types.NUMERIC)
                );
    }

    public List<Map<String, Object>> GETALLUSERS() {
        // Execute the stored procedure
        Map<String, Object> result = GETALLUSERSCALL.execute();

        // Safe cast with an explicit type check
        Object employeesObject = result.get("result_cursor");
        if (employeesObject instanceof List<?>) {
            return (List<Map<String, Object>>) employeesObject;
        } else {
            throw new ClassCastException("Expected a List<Map<String, Object>>, but got: \" + employeesObject.getClass().getName()");
        }
    }
    public List<Map<String, Object>> GETCUSTOMATTRIBUTES(String tableName, String tableRow) {
        // Create a map to hold the input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("table_name", tableName);  // The table name as input
        inParams.put("table_row", tableRow);    // The table row as input

        // Execute the stored procedure with input parameters
        Map<String, Object> result = GETCUSTOMATTRIBUTESCALL.execute(inParams);

        // Safe cast with an explicit type check
        Object attributesObject = result.get("result_cursor");  // 'result_cursor' is the key for the cursor data
        if (attributesObject instanceof List<?>) {
            return (List<Map<String, Object>>) attributesObject;  // Cast and return the result list
        } else {
            throw new ClassCastException("Expected a List<Map<String, Object>>, but got: " + attributesObject.getClass().getName());
        }
    }

    public static void CREATECUSTOMATTRIBUTE(String table_name, Integer table_row, String title, String content_) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("table_name", table_name);
        inParams.put("table_row", table_row);
        inParams.put("title", title);
        inParams.put("content_", content_);

        // Execute the stored procedure
        CREATECUSTOMATTRIBUTECALL.execute(inParams);
    }

    public static void UPDATECUSTOMATTRIBUTE(Integer v_id_c_attribute, String v_title, String v_content_) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_c_attribute", v_id_c_attribute);
        inParams.put("v_title", v_title);
        inParams.put("v_content_", v_content_);

        // Execute the stored procedure
        UPDATECUSTOMATTRIBUTECALL.execute(inParams);
    }

    public static void DELETECUSTOMATTRIBUTE(Integer v_id_c_attribute) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_c_attribute", v_id_c_attribute);

        // Execute the stored procedure
        DELETECUSTOMATTRIBUTECALL.execute(inParams);
    }

    public static void CREATEUSER(String fullname, String username, String pass_word) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("fullname", fullname);
        inParams.put("username", username);
        inParams.put("pass_word", pass_word);

        // Execute the stored procedure
        CREATEUSERCALL.execute(inParams);
    }

    public static void UPDATEUSER(Integer v_id_employee, String v_fullname, String v_username, String v_pass_word) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_employee", v_id_employee);
        inParams.put("v_fullname", v_fullname);
        inParams.put("v_username", v_username);
        inParams.put("v_pass_word", v_pass_word);

        // Execute the stored procedure
        UPDATEUSERCALL.execute(inParams);
    }

    public static void DISABLEUSER(Integer v_id_employee) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_employee", v_id_employee);

        // Execute the stored procedure
        DISABLEUSERCALL.execute(inParams);
    }

    public static void ENABLEUSER(Integer v_id_employee) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_employee", v_id_employee);

        // Execute the stored procedure
        ENABLEUSERCALL.execute(inParams);
    }

    // Method to call GETALLCLIENTS procedure
    public List<Map<String, Object>> GETALLCLIENTS() {
        Map<String, Object> result = GETALLCLIENTSCALL.execute();
        Object clientsObject = result.get("result_cursor");
        if (clientsObject instanceof List<?>) {
            return (List<Map<String, Object>>) clientsObject;
        } else {
            throw new ClassCastException("Expected List<Map<String, Object>>, but got: " + clientsObject.getClass().getName());
        }
    }

    // Method to call CREATECLIENT procedure
    public static void CREATECLIENT(String name, String email) {
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("name_", name);
        inParams.put("email", email);
        CREATECLIENTCALL.execute(inParams);
    }

    // Method to call UPDATECLIENT procedure
    public static void UPDATECLIENT(Integer v_id_client, String v_name_, String v_email) {
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_client", v_id_client);
        inParams.put("v_name_", v_name_);
        inParams.put("v_email", v_email);
        UPDATECLIENTCALL.execute(inParams);
    }

    // Method to call DELETECLIENT procedure
    public static void DELETECLIENT(Integer v_id_client) {
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("v_id_client", v_id_client);
        DELETECLIENTCALL.execute(inParams);
    }
}
