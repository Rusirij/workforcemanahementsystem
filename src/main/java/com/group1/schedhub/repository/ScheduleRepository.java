package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.schedhub.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer>{
    
}
