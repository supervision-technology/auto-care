/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.employee_assignment;

import com.mac.care_point.master.employee.EmployeeRepository;
import com.mac.care_point.master.employee.model.Employee;
import com.mac.care_point.service.common.Constant;
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
    private EmployeeRepository employeeRepository;

    List<TEmployeeAssingment> findAll() {
        return employeeAssignmentRepository.findAll();
    }

    public TEmployeeAssingment saveDetail(TEmployeeAssingment employeeAssingment) {
        Employee findOne = employeeRepository.findOne(employeeAssingment.getEmployee());
        findOne.setBay(employeeAssingment.getBay());

        //update out time
        List<TEmployeeAssingment> updatedObjects = employeeAssignmentRepository.findTop1ByEmployeeOrderByInTimeDesc(employeeAssingment.getEmployee());

        if (!updatedObjects.isEmpty()) {
            TEmployeeAssingment updateEmployeeAssignment = updatedObjects.get(0);
            updateEmployeeAssignment.setOutTime(employeeAssingment.getInTime());
            updateEmployeeAssignment.setStatus(Constant.FINISHE_STATUS);
            employeeAssignmentRepository.save(updateEmployeeAssignment);
        }

        employeeRepository.save(findOne);
        return employeeAssignmentRepository.save(employeeAssingment);
    }
     public Integer getBayAssignEmployeeCount(Integer bay, Integer branch) {
        return employeeAssignmentRepository.getBayAssignEmployeeCount(branch, bay);
    }

}
