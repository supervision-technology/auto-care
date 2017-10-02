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

    public Integer getBayAssignEmployeeCount(Integer bay, Integer branch,String date) {
        return employeeAssignmentRepository.getBayAssignEmployeeCount(branch, bay,date);
    }

    public List<TEmployeeAssingment> getAssignEmployees(String date, Integer branch) {
        return employeeAssignmentRepository.findAssignEmployees(branch, date);
    }

    @Transactional
    public Integer resetEmployees(Integer branch, String time) {
        Integer waitingBayIndex = findBranchWaitingBay(branch);
        employeeAssignmentRepository.resetEmployees(branch, time, waitingBayIndex);
        return 1;
    }

    public Integer findBranchWaitingBay(Integer branch) {
        return employeeAssignmentRepository.findBranchWaitingBay(branch, Constant.VEHICLE_WAITING_BAY);
    }

    TEmployeeAssingment outEmployee(Integer index,String outTime) {
        
        TEmployeeAssingment employeeAssingment = employeeAssignmentRepository.getOne(index);
        employeeAssingment.setOutTime(outTime);
        employeeAssingment.setStatus("FINISHED");
        employeeAssingment.setIsOut(true);
        return employeeAssignmentRepository.save(employeeAssingment);
    }

}
