/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.finger_print;

import com.mac.care_point.master.bay.BayRepository;
import com.mac.care_point.master.bay.model.Bay;
import com.mac.care_point.master.branch.model.MBranch;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.employee_assignment.EmployeeAssignmentRepository;
import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import com.mac.care_point.service.finger_print.model.TFingerPrint;
import com.mac.care_point.service.finger_print.model.TFingerPrintMashine;
import com.mac.care_point.zutil.SecurityUtil;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author 'Kasun Chamara'
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class FingerPrintService {

    @Autowired
    FingerPrintRepository fingerPrintRepository;

    @Autowired
    FingerPrintMashineRepository mashineRepository;

    @Autowired
    EmployeeAssignmentRepository employeeAssignmentRepository;

    @Autowired
    BayRepository bayRepository;

    @Transactional
    public Integer save(TFingerPrint fingerPrint) {
//        fingerPrintRepository.save(fingerPrint);
        String[] dateTime = fingerPrint.getClock().split(" ");

        List<TEmployeeAssingment> assignEmployeeList = employeeAssignmentRepository.findByEmployeeAndStatusAndDate(fingerPrint.getDin(), Constant.PENDING_STATUS, dateTime[0]);
        if (assignEmployeeList.size() > 0) {
            //array list last value bay
            Integer bay = assignEmployeeList.get(assignEmployeeList.size() - 1).getBay();

            String branchName = employeeAssignmentRepository.getBranchName(bay);
            throw new RuntimeException("this employee assigned in " + branchName + " Branch !");
        } else {
            TEmployeeAssingment employeeAssingment = new TEmployeeAssingment();
            List<Bay> bayList = bayRepository.findByBranchAndType(SecurityUtil.getCurrentUser().getBranch(), "EMPLOYEE_WAITING_BAY");
            if (bayList.size() > 0) {
                employeeAssingment.setBay(bayList.get(0).getIndexNo());
            }
            employeeAssingment.setDate(dateTime[0]);
            employeeAssingment.setEmployee(fingerPrint.getDin());
            employeeAssingment.setInTime(fingerPrint.getClock());
            employeeAssingment.setIsOut(false);
            employeeAssingment.setOutTime(null);
            employeeAssingment.setStatus(Constant.PENDING_STATUS);
            return employeeAssignmentRepository.save(employeeAssingment).getIndexNo();

        }

    }

    public List<TFingerPrintMashine> loadMashine(Integer branch) {
        return mashineRepository.findByBranch(branch);
    }

    public List<TEmployeeAssingment> loadData(Integer branch, String date) {
        return employeeAssignmentRepository.findByBranchAndDate(branch,date);
    }

}
