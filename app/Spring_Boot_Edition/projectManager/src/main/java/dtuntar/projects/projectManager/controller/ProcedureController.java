package dtuntar.projects.projectManager.controller;

import dtuntar.projects.projectManager.service.ProcedureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}


