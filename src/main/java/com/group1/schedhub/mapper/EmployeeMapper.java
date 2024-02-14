package com.group1.schedhub.mapper;

import com.group1.schedhub.dto.EmployeeDto;
import com.group1.schedhub.entity.Employee;

/**
 * 
 * This class map the dto to the entity
 * 
 * 
 */
public class EmployeeMapper {
    
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getPassword());
    }   

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        return new Employee(employeeDto.getId(), employeeDto.getFirstName(), employeeDto.getLastName(), employeeDto.getEmail(), employeeDto.getPassword());
    }
}
