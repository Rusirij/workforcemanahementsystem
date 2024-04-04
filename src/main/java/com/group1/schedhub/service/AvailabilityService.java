package com.group1.schedhub.service;

import java.util.Map;

/*
 * SCHED Hub Service interface where all the implementations are done in respective imp classes 
 * 
 * 
 * The record transactions are handled through jpa repositories
 * 
 * @author: Group 1
 * Date: 03/04/2024
 * 
 */
public interface AvailabilityService {

    void addAvailability(String empId,  Map<String, String> availability );

    
}
