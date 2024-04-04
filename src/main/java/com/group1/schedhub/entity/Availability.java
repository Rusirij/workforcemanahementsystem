package com.group1.schedhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "Availability")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "availabilityid")
    private String availabilityId;

    @Column(name = "dayofweek", nullable = false)
    private String dayOfWeek;

    @Column(name = "availabilitystatus", nullable = false)
    private String availabilityStatus;
    
    @Column(name = "employeeid")
    private String employeeId;

    
}
