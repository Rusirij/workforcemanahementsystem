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
 * Represents an employees entity in the system.
 * This class defines the structure and behavior of an employees object.
 * 
 * This entity is used for storing and managing employees information within the application.
 * Additionally, it provides methods for accessing and manipulating employees data.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Profile {

    @Id
    @Column(name = "employeeid")
    private String employeeId;

    @Column(name = "employeename", nullable = false)
    private String employeeName;

    @Column(name = "address", nullable = false, length = 70)
    private String address;

    @Column(name = "maxhoursperweek", nullable = false)
    private int maxHoursPerWeek;

    @Column(name = "availability", length = 100)
    private String availability;

    @Column(name = "employeetype", length = 50)
    private String employeeType;

    @Column(name = "hourlyrate", nullable = false)
    private int hourlyRate;

    @Column(name = "contactno", length = 20)
    private String contactNo;
}
