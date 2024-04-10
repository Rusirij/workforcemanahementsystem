package com.group1.schedhub.service;

import java.util.List;
import java.util.Map;

import com.group1.schedhub.dto.AttendanceRecordDto;
import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.EmployeeNameDto;
import com.group1.schedhub.dto.LeaveRequestDto;
import com.group1.schedhub.dto.LeaveRequestsManagerDto;
import com.group1.schedhub.dto.LeaveResponseManagerDto;
import com.group1.schedhub.dto.ListLeaveRequestDto;
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

    void saveSchedule(String empId, String empName, int dayOfWeek, String shiftType);

    Map<String, String> getShiftScheduleByEmployeeId(String employeeId);

    void saveLeave(LeaveRequestDto leaveRequestDTO);

    List<ListLeaveRequestDto> getAllLeaveRequests(String empId);

    List<LeaveRequestsManagerDto> getAllLeaveRequestsForManager();

    List<EmployeeNameDto> getAllEmployees();

    void updateLeave(LeaveResponseManagerDto dto);

}
