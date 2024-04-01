package com.group1.schedhub.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.group1.schedhub.entity.AttendanceRecord;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Integer>{

     @Query(value="SELECT * FROM attendanceRecord a WHERE a.employeeId = :empId AND a.dateOfRecord = :dateOfRecord", nativeQuery = true)
     AttendanceRecord findByEmployeeIdAndDateOfRecord(@Param("empId") String empId, @Param("dateOfRecord") LocalDate dateOfRecord);
    
}
