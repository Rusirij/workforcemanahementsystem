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

    private Long empId;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private String reportingTo;
    private String address;

}
