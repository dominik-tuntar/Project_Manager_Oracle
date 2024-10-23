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
    @GetMapping("/getCustomAttributes")
    public ResponseEntity<List<Map<String, Object>>> getCustomAttributes(
            @RequestParam("table_name") String table_name,
            @RequestParam("table_row") String table_row) {

        // Call the service method to retrieve the custom attributes
        List<Map<String, Object>> customAttributes = procedureService.GETCUSTOMATTRIBUTES(table_name, table_row);

        // Return the results in the response
        return ResponseEntity.ok(customAttributes);
    }
    @PostMapping("/createCustomAttribute")
    public String createCustomAttribute(
            @RequestParam("table_name") String table_name,
            @RequestParam("table_row") Integer table_row,
            @RequestParam("title") String title,
            @RequestParam("content_") String content_
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.CREATECUSTOMATTRIBUTE(table_name, table_row, title, content_);
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
            return "User created successfully!";
        } catch (Exception e) {
            return "Failed to create user: " + e.getMessage();
        }
    }
    @PutMapping("/updateCustomAttribute")
    public String updateCustomAttribute(
            @RequestParam("v_id_c_attribute") Integer v_id_c_attribute,
            @RequestParam("v_title") String v_title,
            @RequestParam("v_content_") String v_content_
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.UPDATECUSTOMATTRIBUTE(v_id_c_attribute, v_title, v_content_);
            return "Custom attribute updated successfully!";
        } catch (Exception e) {
            return "Failed to update custom attribute: " + e.getMessage();
        }
    }
    @PutMapping("/updateUser")
    public String updateUser(
            @RequestParam("v_id_employee") Integer v_id_employee,
            @RequestParam("v_fullname") String v_fullname,
            @RequestParam("v_username") String v_username,
            @RequestParam("v_pass_word") String v_pass_word
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.UPDATEUSER(v_id_employee, v_fullname, v_username, v_pass_word);
            return "User updated successfully!";
        } catch (Exception e) {
            return "Failed to update user: " + e.getMessage();
        }
    }
    @PutMapping("/disableUser")
    public String disableUser(
            @RequestParam("v_id_employee") Integer v_id_employee
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.DISABLEUSER(v_id_employee);
            return "User disabled successfully!";
        } catch (Exception e) {
            return "Failed to disable user: " + e.getMessage();
        }
    }
    @PutMapping("/enableUser")
    public String enableUser(
            @RequestParam("v_id_employee") Integer v_id_employee
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.ENABLEUSER(v_id_employee);
            return "User enabled successfully!";
        } catch (Exception e) {
            return "Failed to enable user: " + e.getMessage();
        }
    }

    @DeleteMapping("/deleteCustomAttribute")
    public String deleteCustomAttribute(
            @RequestParam("v_id_c_attribute") Integer v_id_c_attribute
    ) {
        try {
            // Call the service method to create a custom attribute
            ProcedureService.DELETECUSTOMATTRIBUTE(v_id_c_attribute);
            return "Custom attribute created successfully!";
        } catch (Exception e) {
            return "Failed to create custom attribute: " + e.getMessage();
        }
    }

    // POST endpoint to create a client
    @PostMapping("/createClient")
    public String createClient(
            @RequestParam("name_") String name,
            @RequestParam("email") String email
    ) {
        try {
            ProcedureService.CREATECLIENT(name, email);
            return "Client created successfully!";
        } catch (Exception e) {
            return "Failed to create client: " + e.getMessage();
        }
    }

    // PUT endpoint to update a client
    @PutMapping("/updateClient")
    public String updateClient(
            @RequestParam("v_id_client") Integer v_id_client,
            @RequestParam("v_name_") String v_name_,
            @RequestParam("v_email") String v_email
    ) {
        try {
            ProcedureService.UPDATECLIENT(v_id_client, v_name_, v_email);
            return "Client updated successfully!";
        } catch (Exception e) {
            return "Failed to update client: " + e.getMessage();
        }
    }

    // DELETE endpoint to delete a client
    @DeleteMapping("/deleteClient")
    public String deleteClient(
            @RequestParam("v_id_client") Integer v_id_client
    ) {
        try {
            ProcedureService.DELETECLIENT(v_id_client);
            return "Client deleted successfully!";
        } catch (Exception e) {
            return "Failed to delete client: " + e.getMessage();
        }
    }

    // GET endpoint to retrieve all clients
    @GetMapping("/getAllClients")
    public ResponseEntity<List<Map<String, Object>>> getAllClients() {
        try {
            List<Map<String, Object>> clients = procedureService.GETALLCLIENTS();
            return new ResponseEntity<>(clients, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


