package com.group1.schedhub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequest {

    private String employeeId;
    private String employeeName;
    private Address address;
    private String contactNumber;
    private int hourlyRate;
    private int maxHoursPerWeek;
    
}