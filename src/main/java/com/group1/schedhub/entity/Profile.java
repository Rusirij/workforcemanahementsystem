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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

}
