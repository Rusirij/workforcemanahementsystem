package com.group1.schedhub.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.group1.schedhub.dto.EmployeeDto;
import com.group1.schedhub.service.EmployeeService;

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

    private EmployeeService employeeService;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
    
    @PostMapping("/add")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Buid get employee rest api
    @GetMapping("{id}")    
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    @GetMapping("/allEmployees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    //Build Update employee rest api
    @PutMapping("/updateEmp/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId, @RequestBody EmployeeDto updateEmployee) {
        EmployeeDto employees = employeeService.updateEmployee(employeeId, updateEmployee);
        
        return ResponseEntity.ok(employees);
    }

    //Build Delete Employee REST API
    @DeleteMapping("/deleteEmp/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully!");

    }

    @GetMapping("/empLogin/{email_id}/{password}")    
    public ResponseEntity<EmployeeDto> getEmployeeEmailPassword(@PathVariable("email_id") String emailId, @PathVariable("password") String password) {
        EmployeeDto employeeDto = employeeService.validateEmpLogin(emailId, password);
        return ResponseEntity.ok(employeeDto);
    }
    
}
