package com.group1.schedhub.entity;
import java.time.LocalDate;
import java.time.LocalTime;

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
 * Represents an attendancerecord entity in the system.
 * This class defines the structure and behavior of an attendancerecord object.
 * 
 * This entity is used for storing and managing attendancerecord information within the application.
 * Additionally, it provides methods for accessing and manipulating attendancerecord data.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attendancerecord")
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendanceid")
    private Integer attendanceId;

    @Column(name = "dateofrecord", nullable = false)
    private LocalDate dateOfRecord;

    @Column(name = "employeeid", nullable = false)
    private String employeeId;

    @Column(name = "logintime")
    private LocalTime loginTime;

    @Column(name = "logouttime")
    private LocalTime logoutTime;

    @Column(name = "machineid")
    private String machineId;
    
}
