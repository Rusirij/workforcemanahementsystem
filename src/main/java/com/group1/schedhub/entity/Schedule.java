package com.group1.schedhub.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents an Availability entity in the system.
 * This class defines the structure and behavior of an Availability object.
 * 
 * This entity is used for storing and managing Availability information within the application.
 * Additionally, it provides methods for accessing and manipulating Availability data.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "scheduletemp")
public class Schedule {
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scheduleid")
    private int scheduleId;

    @Column(name = "empid")
    private String employeeId;

    @Column(name = "employeename", length = 255)
    private String employeeName;

    @Column(name = "dayoftheweek", length = 20)
    private String dayOfWeek;

    @Column(name = "shifttype", length = 10)
    private String shiftType;
    
}
