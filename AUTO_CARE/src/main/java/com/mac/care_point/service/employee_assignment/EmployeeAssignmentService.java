/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment;

import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import com.mac.care_point.service.employee_attendance.TEmployeeAttendanceRepository;
import com.mac.care_point.service.employee_attendance.model.TEmployeeAttendance;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author L T430
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class EmployeeAssignmentService {

    @Autowired
    private EmployeeAssignmentRepository employeeAssignmentRepository;

    @Autowired
    private TEmployeeAttendanceRepository attendanceRepository;

    List<TEmployeeAssingment> findAll() {
        return employeeAssignmentRepository.findAll();
    }

    TEmployeeAssingment saveDetail(TEmployeeAssingment employeeAssingment) {
        System.out.println("aaaaaaaaaaa");
        System.out.println(employeeAssingment.getEmployee().getIndexNo());
        
        List<TEmployeeAttendance> attendances = attendanceRepository.findByDateAndEmployee(new Date(), employeeAssingment.getEmployee().getIndexNo());
        System.out.println(attendances.size());
        if (attendances.isEmpty()) {
            return null;
        } else {
            TEmployeeAttendance editObject = attendances.get(0);
            editObject.setCurrentBay(employeeAssingment.getBay().getIndexNo());
            TEmployeeAttendance save = attendanceRepository.save(editObject);
            return employeeAssingment;
        }
    }

}
