package dtuntar.projects.projectManager.controller;

import dtuntar.projects.projectManager.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProcedureController {

    private final ProcedureService procedureService;

    @Autowired
    public ProcedureController(ProcedureService procedureService) {
        this.procedureService = procedureService;
    }

    // GET endpoint to retrieve all users from the stored procedure
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        try {
            List<Map<String, Object>> users = procedureService.GETALLUSERS();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception (not shown here) and return a 500 status code
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/createCustomAttribute")
    public String createCustomAttribute(
            @RequestParam("table_name") String tableName,
            @RequestParam("table_row") Integer tableRow,
            @RequestParam("title") String title,
            @RequestParam("content_") String content_
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.CREATECUSTOMATTRIBUTE(tableName, tableRow, title, content_);
            return "Custom attribute created successfully!";
        } catch (Exception e) {
            return "Failed to create custom attribute: " + e.getMessage();
        }
    }
    @PostMapping("/createUser")
    public String createUser(
            @RequestParam("fullname") String fullname,
            @RequestParam("username") String username,
            @RequestParam("pass_word") String pass_word
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.CREATEUSER(fullname, username, pass_word);
            return "Custom attribute created successfully!";
        } catch (Exception e) {
            return "Failed to create custom attribute: " + e.getMessage();
        }
    }
}


