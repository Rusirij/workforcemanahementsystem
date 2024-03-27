package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.group1.schedhub.entity.EmployeeCredentials;
import com.group1.schedhub.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, String>{


    
}
