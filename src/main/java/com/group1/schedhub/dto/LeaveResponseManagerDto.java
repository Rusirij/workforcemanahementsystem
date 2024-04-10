package com.group1.schedhub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeaveResponseManagerDto {

    private String reqId;
    private String name;
    private String fromDate;
    private String toDate;
    private String leaveType;
    private String reason;
    private String approvalStatus;
    private String replacement;
    
    
}
