/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment;

import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/transaction/employee-assignment")
public class EmployeeAssignmentController {

    @Autowired
    EmployeeAssignmentService employeeAssignmentService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<TEmployeeAssingment> findAll() {
        return employeeAssignmentService.findAll();
    }
    
    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public TEmployeeAssingment insertDetail(@RequestBody TEmployeeAssingment employeeAssingment) {
        
        return employeeAssignmentService.saveDetail(employeeAssingment);
    }

    
}
