package com.group1.schedhub.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.group1.schedhub.dto.EmployeeCredentialsDto;
import com.group1.schedhub.dto.ProfileDto;
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
import java.util.List;




@RestController
@RequestMapping("/api/employees")
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
public class EmployeeController implements WebMvcConfigurer {

    private EmployeeCredentialsService employeeService;

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
    
}
