package com.group1.schedhub.mapper;

import com.group1.schedhub.dto.EmployeeDto;
import com.group1.schedhub.dto.ProfileDto;
import com.group1.schedhub.entity.Employee;
import com.group1.schedhub.entity.Profile;

/**
 * 
 * This class map the dto to the entity
 * 
 * 
 */
public class EmployeeMapper {
    
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getPassword(),
        employee.getEmployeeType());
    }   

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(employeeDto.getId(), employeeDto.getFirstName(), employeeDto.getLastName(), employeeDto.getEmail(), 
        employeeDto.getPassword(), employeeDto.getEmployeeType());
    }

    public static ProfileDto mapToProfileDto(Profile profile) {
        return new ProfileDto(
            profile.getEmpId(),
            profile.getFirstName(),
            profile.getLastName(),
            profile.getEmail(),
            profile.getContactNo(),
            profile.getReportingTo(),
            profile.getAddress()
        );
    }

    public static Profile mapToProfile(ProfileDto profileDto) {
        Profile profile = new Profile();
        profile.setEmpId(profileDto.getEmpId());
        profile.setFirstName(profileDto.getFirstName());
        profile.setLastName(profileDto.getLastName());
        profile.setEmail(profileDto.getEmail());
        profile.setContactNo(profileDto.getContactNo());
        profile.setReportingTo(profileDto.getReportingTo());
        profile.setAddress(profileDto.getAddress());

        return profile;
    }
}
