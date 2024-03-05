package com.group1.schedhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.schedhub.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long>{

    
}
