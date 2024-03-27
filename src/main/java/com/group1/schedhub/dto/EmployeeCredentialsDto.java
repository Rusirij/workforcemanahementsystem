package com.group1.schedhub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCredentialsDto {
    
    private Integer loginId; 
    private String employeeId;
    private String employeeEmail;
    private String username;
    private String password;
    private String employeeType;

}
