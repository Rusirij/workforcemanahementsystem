package com.group1.schedhub.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvailabilityDto {

    private String availabilityId;
    private String dayOfWeek;
    private String availabilityStatus;
    private String employeeId;

    
}
