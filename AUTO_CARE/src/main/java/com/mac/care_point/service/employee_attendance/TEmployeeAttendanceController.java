/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_attendance;

import com.mac.care_point.service.employee_attendance.model.TEmployeeAttendance;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author L T430
 */
@RestController
@CrossOrigin
@RequestMapping(value = "/api/care-point/transaction/employee-attendance")
public class TEmployeeAttendanceController {
    
     @Autowired
    TEmployeeAttendanceService employeeAttendanceService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<TEmployeeAttendance> findAll() {
        return employeeAttendanceService.findAll();
    }
}
