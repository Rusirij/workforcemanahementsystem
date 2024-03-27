package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group1.schedhub.entity.EmployeeCredentials;

public interface EmployeeCredentialsRepository extends JpaRepository<EmployeeCredentials, Long>{
    @Query(value="SELECT * FROM employeeCredential e WHERE e.employeeEmail = :email AND e.password = :password", nativeQuery = true)
    EmployeeCredentials findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

}
