package dtuntar.projects.projectManager.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.io.Serializable;

public class Custom_Attribute implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, updatable = false)
    private Long ID_EMPLOYEE;
    @Column(nullable = false, updatable = false)
    private Short ID_EMPLOYEE_ROLE;
    private String FULLNAME;
    @Column(nullable = false)
    private String USERNAME;
    @Column(nullable = false)
    private Short STATUS;
}
