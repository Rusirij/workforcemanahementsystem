package com.group1.schedhub.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;
import com.group1.schedhub.entity.AttendanceRecord;
import com.group1.schedhub.entity.EmployeeCredentials;
import com.group1.schedhub.entity.Profile;
import com.group1.schedhub.entity.Schedule;
import com.group1.schedhub.exception.ResourceNotFoundException;
import com.group1.schedhub.mapper.EmployeeCredentialsMapper;
import com.group1.schedhub.repository.AttendanceRecordRepository;
import com.group1.schedhub.repository.EmployeeCredentialsRepository;
import com.group1.schedhub.repository.ProfileRepository;
import com.group1.schedhub.repository.ScheduleRepository;
import com.group1.schedhub.service.EmployeeCredentialsService;

import lombok.AllArgsConstructor;
/*
 * SCHED Hub Service imp class where all the business logic is implemented 
 * 
 * 
 * The record transactions are handled through jpa repositories
 * 
 * @author: Group 1
 * Date: 03/04/2024
 * 
 */
@Service
@AllArgsConstructor
public class EmployeeCredentialsServiceImpl implements EmployeeCredentialsService{

    private EmployeeCredentialsRepository employeeRepository;

    private ProfileRepository profileRepository;

    private AttendanceRecordRepository attendanceRecordRepository;

    private ScheduleRepository scheduleRepository;



    @Override
    public EmployeeCredentialsDto validateEmpLogin(String email, String password) {
        EmployeeCredentials employee = employeeRepository.findByEmailAndPassword(email, password);
        if (employee != null) {
            return EmployeeCredentialsMapper.mapToEmployeeCredentialDto(employee);
        } else {
            return null;
        }
    
    }

    @Override
    public ProfileDto getEmployeProfile(String employeeId) {
        Profile profile = profileRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given id: " + employeeId));
        
        return EmployeeCredentialsMapper.mapToProfileDto(profile);
    }

    @Override
    public void saveClockIn(String employeeId, String datePart, String timePart) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy");
        LocalDate dateOfRecord = LocalDate.parse(datePart, formatter);

        DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("[h:]mm:ss a", Locale.ENGLISH);
        LocalTime loginTime = LocalTime.parse(timePart, formatterTime);

        // Create a new AttendanceRecord object
        AttendanceRecord attendanceRecord = new AttendanceRecord();
        attendanceRecord.setEmployeeId(employeeId);
        attendanceRecord.setDateOfRecord(dateOfRecord);
        attendanceRecord.setLoginTime(loginTime);

        // Save the record to the repository
        attendanceRecordRepository.save(attendanceRecord);
    }

    @Override
    public void saveClockOut(String employeeId, String datePart, String timePart) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy");
        LocalDate dateOfRecord = LocalDate.parse(datePart, formatter);

        DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("[h:]mm:ss a", Locale.ENGLISH);
        LocalTime logoutTime = LocalTime.parse(timePart, formatterTime);

        AttendanceRecord timeInRecord = attendanceRecordRepository.findByEmployeeIdAndDateOfRecord(employeeId, dateOfRecord);
        timeInRecord.setLogoutTime(logoutTime);
        attendanceRecordRepository.save(timeInRecord);

    }

    /**
     * 
     * Save employee data using jpa repo
     */
    @Override
    public void saveProfile(String employeeID, String employeeName, String address, int maxHoursPerWeek, int hourlyRate,
            String contactNo) {
                Profile profile = new Profile();
                profile.setEmployeeId(employeeID);
                profile.setEmployeeName(employeeName);
                profile.setAddress(address);
                profile.setMaxHoursPerWeek(maxHoursPerWeek);
                profile.setEmployeeType("Employee");
                profile.setHourlyRate(hourlyRate);
                profile.setContactNo(contactNo);
                
                // Save the profile using profileRepository
                profileRepository.save(profile);
        }

    /*
     * 
     * Delete employee
     */
    @Override
    public void deleteEmployee(String empId) {
        profileRepository.deleteById(empId);
    }

    @Override
    public void saveSchedule(String empName, int dayOfWeek, String shiftType) {

        String dayName = convertDayOfWeek(dayOfWeek);

        Schedule schedule = new Schedule();
        schedule.setEmployeeName(empName);
        schedule.setDayOfWeek(dayName);
        schedule.setShiftType(shiftType);

        scheduleRepository.save(schedule);
    }


    public static String convertDayOfWeek(int dayOfWeek) {
        String dayName;
        switch (dayOfWeek) {
            case 0:
                dayName = "Monday";
                break;
            case 1:
                dayName = "Tuesday";
                break;
            case 2:
                dayName = "Wednesday";
                break;
            case 3:
                dayName = "Thursday";
                break;
            case 4:
                dayName = "Friday";
                break;
            case 5:
                dayName = "Saturday";
                break;
            case 6:
                dayName = "Sunday";
                break;
            default:
                dayName = "Invalid Day";
                break;
        }
        return dayName;
    }


    
}
