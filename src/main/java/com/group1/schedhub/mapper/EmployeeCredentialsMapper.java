package com.group1.schedhub.mapper;

import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;
import com.group1.schedhub.entity.EmployeeCredentials;
import com.group1.schedhub.entity.Profile;

/**
 * 
 * This class map the dto to the entity
 * 
 * 
 */
public class EmployeeCredentialsMapper {
    
    public static EmployeeCredentialsDto mapToEmployeeCredentialDto(EmployeeCredentials employeeCredential) {
        return new EmployeeCredentialsDto(employeeCredential.getLoginId(), employeeCredential.getEmployeeId(), 
        employeeCredential.getEmployeeEmail(), employeeCredential.getUsername(), employeeCredential.getPassword(), 
        employeeCredential.getEmployeeType());
    }   

    public static EmployeeCredentials mapToEmployeeCredential(EmployeeCredentialsDto employeeCredentialDto) {
        EmployeeCredentials employeeCredential = new EmployeeCredentials();
        employeeCredential.setLoginId(employeeCredentialDto.getLoginId());
        employeeCredential.setEmployeeId(employeeCredentialDto.getEmployeeId());
        employeeCredential.setEmployeeEmail(employeeCredentialDto.getEmployeeEmail());
        employeeCredential.setUsername(employeeCredentialDto.getUsername());
        employeeCredential.setPassword(employeeCredentialDto.getPassword());
        employeeCredential.setEmployeeType(employeeCredentialDto.getEmployeeType());
        return employeeCredential;
    }

    public static ProfileDto mapToProfileDto(Profile profile) {
        return new ProfileDto(
            profile.getEmployeeId(),
            profile.getEmployeeName(),
            profile.getAddress(),
            profile.getMaxHoursPerWeek(),
            profile.getAvailability(),
            profile.getEmployeeType(),
            profile.getHourlyRate(),
            profile.getContactNo()
        );
    }
    
    public static Profile mapToProfile(ProfileDto profileDto) {
        Profile profile = new Profile();
        profile.setEmployeeId(profileDto.getEmployeeId());
        profile.setEmployeeName(profileDto.getEmployeeName());
        profile.setAddress(profileDto.getAddress());
        profile.setMaxHoursPerWeek(profileDto.getMaxHoursPerWeek());
        profile.setAvailability(profileDto.getAvailability());
        profile.setEmployeeType(profileDto.getEmployeeType());
        profile.setContactNo(profileDto.getContactNo());
        profile.setHourlyRate(profileDto.getHourlyRate());
    
        return profile;
    }
    
    
}
