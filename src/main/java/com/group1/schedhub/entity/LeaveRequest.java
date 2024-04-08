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
import java.time.LocalDate;

/**
 * Represents an leaveRequest entity in the system.
 * This class defines the structure and behavior of an leaveRequest object.
 * 
 * This entity is used for storing and managing leaveRequest information within the application.
 * Additionally, it provides methods for accessing and manipulating leaveRequest data.
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "leaverequests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestid")
    private int requestId;

    @Column(name = "employeeid", nullable = false)
    private String employeeId;

    @Column(name = "requestreason")
    private String requestReason;

    @Column(name = "fromdate")
    private LocalDate fromDate;

    @Column(name = "todate")
    private LocalDate toDate;

    @Column(name = "leavetype")
    private String leaveType;

    @Column(name = "requeststatus")
    private String requestStatus;

    @Column(name = "assignto")
    private String assignTo;
}
