package com.group1.schedhub.dto;

import java.time.LocalDate;
import java.time.LocalTime;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRecordDto {

    private Long attendanceId;
    private LocalDate dateOfRecord;
    private String employeeId;
    private LocalTime loginTime;
    private LocalTime logoutTime;
    private String machineId;
}
