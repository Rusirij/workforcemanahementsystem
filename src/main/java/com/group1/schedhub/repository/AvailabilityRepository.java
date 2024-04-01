package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.schedhub.entity.Availability;

public interface AvailabilityRepository extends JpaRepository<Availability, String>{
    
}
