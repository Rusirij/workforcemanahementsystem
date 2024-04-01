package com.group1.schedhub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto {

    private String employeeId;
    private String employeeName;
    private String address;
    private int maxHoursPerWeek;
    private String availability;
    private String employeeType;
    private int hourlyRate;
    private String contactNo;


}
