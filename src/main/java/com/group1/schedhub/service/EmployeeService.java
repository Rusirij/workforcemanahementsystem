package com.group1.schedhub.service;

import java.util.List;

import com.group1.schedhub.dto.EmployeeDto;
import com.group1.schedhub.dto.ProfileDto;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployees();
    
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

    void deleteEmployee(long employeeId);

    EmployeeDto validateEmpLogin(String email, String password);

}
