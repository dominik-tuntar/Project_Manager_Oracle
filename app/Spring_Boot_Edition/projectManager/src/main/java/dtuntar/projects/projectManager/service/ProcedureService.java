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
    private static SimpleJdbcCall CREATECUSTOMATTRIBUTECALL;
    private static SimpleJdbcCall CREATEUSERCALL;

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
        this.CREATECUSTOMATTRIBUTECALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("CREATECUSTOMATTRIBUTE")
                .declareParameters(
                        new SqlParameter("table_name", Types.VARCHAR),
                        new SqlParameter("table_row", Types.NUMERIC),
                        new SqlParameter("title", Types.VARCHAR),
                        new SqlParameter("content_", Types.VARCHAR)
                );

        this.CREATEUSERCALL = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("CREATEUSER")
                .declareParameters(
                        new SqlParameter("fullname", Types.VARCHAR),
                        new SqlParameter("username", Types.VARCHAR),
                        new SqlParameter("pass_word", Types.VARCHAR)
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

    public static void CREATEUSER(String fullname, String username, String pass_word) {
        // Create a map to hold input parameter values
        Map<String, Object> inParams = new HashMap<>();
        inParams.put("fullname", fullname);
        inParams.put("username", username);
        inParams.put("pass_word", pass_word);

        // Execute the stored procedure
        CREATEUSERCALL.execute(inParams);
    }
}
