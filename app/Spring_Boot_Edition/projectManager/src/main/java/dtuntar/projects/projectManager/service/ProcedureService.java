package dtuntar.projects.projectManager.service;

import jakarta.annotation.PostConstruct;
import org.hibernate.dialect.OracleTypes;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProcedureService {
    private final JdbcTemplate jdbcTemplate;
    private SimpleJdbcCall GETALLUSERSCALL;

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
}
