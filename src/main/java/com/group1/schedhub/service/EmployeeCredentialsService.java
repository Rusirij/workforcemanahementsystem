package com.group1.schedhub.service;

import java.util.List;

import com.group1.schedhub.dto.AttendanceRecordDto;
import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;

/*
 * SCHED Hub Service interface where all the implementations are done in respective imp classes 
 * 
 * 
 * The record transactions are handled through jpa repositories
 * 
 * @author: Group 1
 * Date: 03/04/2024
 * 
 */
public interface EmployeeCredentialsService {


    EmployeeCredentialsDto validateEmpLogin(String email, String password);

    ProfileDto getEmployeProfile(String employeeId);

    void saveClockIn(String employeeId, String datePart,String timePart);

    void saveClockOut(String employeeId, String datePart,String timePart);

    void saveProfile(String employeeID, String employeeName, String address, int maxHoursPerWeek, int hourlyRate, String contactNo);

    void deleteEmployee(String empId);

    void saveSchedule(String empName, int dayOfWeek, String shiftType);

}
