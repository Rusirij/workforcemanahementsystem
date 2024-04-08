package com.group1.schedhub.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.EmployeeRequest;
import com.group1.schedhub.dto.LeaveRequestDto;
import com.group1.schedhub.dto.ListLeaveRequestDto;
import com.group1.schedhub.dto.ProfileDto;
import com.group1.schedhub.service.AvailabilityService;
import com.group1.schedhub.service.EmployeeCredentialsService;

import lombok.AllArgsConstructor;

import org.springframework.boot.autoconfigure.amqp.RabbitConnectionDetails.Address;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

/*
 * SCHED Hub Controller class
 * Handles all the axios urls from the front end and connects th back end.
 * 
 * The record transactions are handled through jpa repositories
 * 
 * @author: Group 1
 * Date: 03/04/2024
 * 
 */


@RestController
@RequestMapping("/api/employees")
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
public class EmployeeController implements WebMvcConfigurer {

    private EmployeeCredentialsService employeeService;
    private AvailabilityService availabilityService;

    /**
     * CORS is added to handle cross site issues where front end and back end are hosted in 
     * two URL
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
    

    /**
     * 
     * Method to validate the login
     * 
     * 
     * @param emailId
     * @param password
     * @return
     */
    @GetMapping("/empLogin/{email_id}/{password}")    
    public ResponseEntity<EmployeeCredentialsDto> getEmployeeEmailPassword(@PathVariable("email_id") String emailId, @PathVariable("password") String password) {
        EmployeeCredentialsDto employeeDto = employeeService.validateEmpLogin(emailId, password);
        return ResponseEntity.ok(employeeDto);
    }

    /**
     * 
     * This methof retuns the employee profile details
     * @param employeeId
     * @return
     */
    @GetMapping("/empProfile/{employeeId}")    
    public ResponseEntity<ProfileDto> getProfile(@PathVariable("employeeId") String employeeId) {
        ProfileDto profileDto = employeeService.getEmployeProfile(employeeId);
        return ResponseEntity.ok(profileDto);
    }
    
    /**
     * This method saves the availability of the employee
     * 
     */
    @PostMapping("/availability") // Add a new POST mapping
    public ResponseEntity<String> postAvailabilityData(@RequestBody Map<String, Object> requestData) {
        // Extract empId and availability from the request data
        String empId = (String) requestData.get("empId");
        Map<String, String> availability = (Map<String, String>) requestData.get("availability");

        availabilityService.addAvailability(empId, availability);
        
        // Return a success response
        return ResponseEntity.status(HttpStatus.OK).body("Availability data received successfully");
    }

    /**
     * This method saves clockin time to the database
     * @param requestData
     * @return
     */
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

    /**
     * 
     * Employee check out time saved in database
     * @param requestData
     * @return
     */
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

    /**
     * 
     * Add and employee by manager
     * 
     * @param employeeRequest
     * @return
     */
     @PostMapping("/addemp")
    public ResponseEntity<String> addEmployee(@RequestBody EmployeeRequest employeeRequest) {
        // Extract employee details from the request
        String employeeId = employeeRequest.getEmployeeId();
        String employeeName = employeeRequest.getEmployeeName();
        com.group1.schedhub.dto.Address address = employeeRequest.getAddress();
        String add = address.getStreet() + " " + address.getCity();
        String contactNumber = employeeRequest.getContactNumber();
        int hourlyRate = employeeRequest.getHourlyRate();
        int maxHoursPerWeek = employeeRequest.getMaxHoursPerWeek();

        // Here perform saving the employee details to database, call the service class
        employeeService.saveProfile(employeeId, employeeName, add, maxHoursPerWeek, hourlyRate, contactNumber);
        // Return a success response
        return ResponseEntity.status(HttpStatus.OK).body("Employee data received successfully");
    }

    /**
     * Delete an employee
     * 
     * @param empId
     * @return
     */
    @DeleteMapping("/deleteempl/{empId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String empId) {
        try {
            employeeService.deleteEmployee(empId);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting employee");
        }
    }

    @PostMapping("/saveSchedule")
    public ResponseEntity<?> saveSchedule(@RequestBody List<Map<String, List<Map<String, String>>>> scheduleData) {
        try {
            for (int i = 0; i < scheduleData.size(); i++) {
                Map<String, List<Map<String, String>>> daySchedule = scheduleData.get(i);
                for (String shift : daySchedule.keySet()) {
                    List<Map<String, String>> employees = daySchedule.get(shift);
                    for (Map<String, String> employee : employees) {
                        String employeeId = employee.get("employeeId");
                        String employeeName = employee.get("employeeName");
                        employeeService.saveSchedule(employeeId, employeeName, i, shift);
                    }
                }
            }
            return ResponseEntity.ok("Schedule saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving schedule");
        }
    }

    @GetMapping("/shift-schedule/{employeeId}")
    public ResponseEntity<Map<String, String>> getShiftScheduleByEmployeeId(@PathVariable String employeeId) {
        Map<String, String> shiftSchedule = employeeService.getShiftScheduleByEmployeeId(employeeId);
        if (shiftSchedule.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(shiftSchedule);
        }
    }

    @PostMapping("/leaveRequest")
    public ResponseEntity<String> saveLeaveRequest(@RequestBody LeaveRequestDto leaveRequestDTO) {
        try {
            employeeService.saveLeave(leaveRequestDTO);

            return new ResponseEntity<>("Leave request submitted successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to submit leave request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listLeaveRequest")
    public ResponseEntity<List<ListLeaveRequestDto>> listLeaveRequest(@RequestParam String empId) {
        try {
            List<ListLeaveRequestDto> leaveRequests = employeeService.getAllLeaveRequests(empId);
            return new ResponseEntity<>(leaveRequests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
