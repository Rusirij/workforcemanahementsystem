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
public class ListLeaveRequestDto {
    private String requestId;
    private String requestReason;
    private String requestStatus;
    private LocalDate fromDate;
    private LocalDate toDate;
    
}
