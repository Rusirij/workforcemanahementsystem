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
import com.group1.schedhub.exception.ResourceNotFoundException;
import com.group1.schedhub.mapper.EmployeeCredentialsMapper;
import com.group1.schedhub.repository.AttendanceRecordRepository;
import com.group1.schedhub.repository.EmployeeCredentialsRepository;
import com.group1.schedhub.repository.ProfileRepository;
import com.group1.schedhub.service.EmployeeCredentialsService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeCredentialsServiceImpl implements EmployeeCredentialsService{

    private EmployeeCredentialsRepository employeeRepository;

    private ProfileRepository profileRepository;

    private AttendanceRecordRepository attendanceRecordRepository;



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

    

    
}
