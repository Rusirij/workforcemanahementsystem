package com.group1.schedhub.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 * Represents an employeeCredential entity in the system.
 * This class defines the structure and behavior of an employeeCredential object.
 * 
 * This entity is used for storing and managing employeeCredential information within the application.
 * Additionally, it provides methods for accessing and manipulating employeeCredential data.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employeeCredential")
public class EmployeeCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loginid")
    private Integer loginId;

    @Column(name = "employeeid")
    private String employeeId;

    @Column(name = "employeeemail")
    private String employeeEmail;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "employeetype")
    private String employeeType;
    
}
