package com.group1.schedhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group1.schedhub.entity.LeaveRequest;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer>{

    @Query(value="SELECT * FROM leaveRequests r WHERE r.employeeId = :empId", nativeQuery = true)
    List<LeaveRequest> findByEmployeeId(@Param("empId") String empId);
 
}
