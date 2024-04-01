package com.group1.schedhub.service;

import java.util.Map;


public interface AvailabilityService {

    void addAvailability(String empId,  Map<String, String> availability );

    
}
