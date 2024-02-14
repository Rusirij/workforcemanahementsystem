package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group1.schedhub.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    @Query(value="SELECT * FROM employees e WHERE e.email_id = :email AND e.password = :password", nativeQuery = true)
    Employee findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

}
