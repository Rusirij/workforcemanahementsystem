package com.group1.schedhub.service;

import java.util.List;

import com.group1.schedhub.dto.AttendanceRecordDto;
import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;

public interface EmployeeCredentialsService {


    EmployeeCredentialsDto validateEmpLogin(String email, String password);

    ProfileDto getEmployeProfile(String employeeId);

    void saveClockIn(String employeeId, String datePart,String timePart);

    void saveClockOut(String employeeId, String datePart,String timePart);

}
