package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.schedhub.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    
}
