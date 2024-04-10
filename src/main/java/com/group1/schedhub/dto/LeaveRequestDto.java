package com.group1.schedhub.dto;


import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequestDto {
    private String employeeId;
    private String leaveType;
    private String reason;
    private LocalDate fromDate;
    private LocalDate toDate;
}
