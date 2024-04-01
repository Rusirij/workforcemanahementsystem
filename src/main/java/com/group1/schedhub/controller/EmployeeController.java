package com.group1.schedhub.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;
import com.group1.schedhub.service.AvailabilityService;
import com.group1.schedhub.service.EmployeeCredentialsService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;




@RestController
@RequestMapping("/api/employees")
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
public class EmployeeController implements WebMvcConfigurer {

    private EmployeeCredentialsService employeeService;
    private AvailabilityService availabilityService;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
    

    @GetMapping("/empLogin/{email_id}/{password}")    
    public ResponseEntity<EmployeeCredentialsDto> getEmployeeEmailPassword(@PathVariable("email_id") String emailId, @PathVariable("password") String password) {
        EmployeeCredentialsDto employeeDto = employeeService.validateEmpLogin(emailId, password);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping("/empProfile/{employeeId}")    
    public ResponseEntity<ProfileDto> getProfile(@PathVariable("employeeId") String employeeId) {
        ProfileDto profileDto = employeeService.getEmployeProfile(employeeId);
        return ResponseEntity.ok(profileDto);
    }
    
    @PostMapping("/availability") // Add a new POST mapping
    public ResponseEntity<String> postAvailabilityData(@RequestBody Map<String, Object> requestData) {
        // Extract empId and availability from the request data
        String empId = (String) requestData.get("empId");
        Map<String, String> availability = (Map<String, String>) requestData.get("availability");

        availabilityService.addAvailability(empId, availability);
        
        // Return a success response
        return ResponseEntity.status(HttpStatus.OK).body("Availability data received successfully");
    }

    @PostMapping("/clockin")
    public ResponseEntity<String> clockIn(@RequestBody Map<String, Object> requestData) {
        try {
            String empId = (String) requestData.get("empId");
            String dateTimeString = (String) requestData.get("dateTime");

            String[] parts = dateTimeString.split(",");

            // Extract date and time parts
            String datePart = parts[0].trim(); // Trim to remove any leading or trailing whitespace
            String timePart = parts[1].trim(); // Trim to remove any leading or trailing whitespace
    
            employeeService.saveClockIn(empId, datePart, timePart);
            return ResponseEntity.status(HttpStatus.OK).body("Clock in successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error clocking in");
        }
    }

    @PostMapping("/clockout")
    public ResponseEntity<String> clockOut(@RequestBody Map<String, Object> requestData) {
        try {
            String empId = (String) requestData.get("empId");
            String dateTimeString = (String) requestData.get("dateTime");

            String[] parts = dateTimeString.split(",");

            // Extract date and time parts
            String datePart = parts[0].trim(); // Trim to remove any leading or trailing whitespace
            String timePart = parts[1].trim(); // Trim to remove any leading or trailing whitespace
    
            employeeService.saveClockOut(empId, datePart, timePart);
            return ResponseEntity.status(HttpStatus.OK).body("Clock out successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error clocking in");
        }
    }
}
