package com.group1.schedhub.service.impl;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.group1.schedhub.dto.AvailabilityDto;
import com.group1.schedhub.entity.Availability;
import com.group1.schedhub.repository.AvailabilityRepository;
import com.group1.schedhub.repository.ProfileRepository;
import com.group1.schedhub.service.AvailabilityService;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService{
    
    private AvailabilityRepository availabilityRepository;

    
    @Override
     public void addAvailability(String empId, Map<String, String> availabilityDetails) {
        Set<Availability> availabilities = new HashSet<>();

        for (Map.Entry<String, String> entry : availabilityDetails.entrySet()) {
            String dayOfWeek = entry.getKey();
            String shift = entry.getValue();

            Availability availability = new Availability();
            availability.setEmployeeId(empId);
            availability.setDayOfWeek(dayOfWeek);
            availability.setAvailabilityStatus(shift);

            availabilities.add(availability);
        }

        availabilityRepository.saveAll(availabilities);

    }
}
