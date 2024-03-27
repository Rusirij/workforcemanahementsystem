package com.group1.schedhub.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;
import com.group1.schedhub.entity.EmployeeCredentials;
import com.group1.schedhub.entity.Profile;
import com.group1.schedhub.exception.ResourceNotFoundException;
import com.group1.schedhub.mapper.EmployeeCredentialsMapper;
import com.group1.schedhub.repository.EmployeeCredentialsRepository;
import com.group1.schedhub.repository.ProfileRepository;
import com.group1.schedhub.service.EmployeeCredentialsService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeCredentialsServiceImpl implements EmployeeCredentialsService{

    private EmployeeCredentialsRepository employeeRepository;

    private ProfileRepository profileRepository;



    @Override
    public EmployeeCredentialsDto validateEmpLogin(String email, String password) {
        EmployeeCredentials employee = employeeRepository.findByEmailAndPassword(email, password);
        if (employee != null) {
            return EmployeeCredentialsMapper.mapToEmployeeCredentialDto(employee);
        } else {
            return null;
        }
    
    }

    @Override
    public ProfileDto getEmployeProfile(String employeeId) {
        Profile profile = profileRepository.findById(employeeId).orElseThrow(() -> new ResourceNotFoundException("Employee is not exist with given id: " + employeeId));
        
        return EmployeeCredentialsMapper.mapToProfileDto(profile);
    }

    
}
