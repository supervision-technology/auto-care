/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicleAssignment;

import com.mac.care_point.master.bay.BayRepository;
import com.mac.care_point.master.bay.model.Bay;
import com.mac.care_point.master.employee.EmployeeRepository;
import com.mac.care_point.master.vehicle.VehicleRepository;
import com.mac.care_point.master.vehicleAssignment.model.TVehicleAssignment;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.employee_assignment.EmployeeAssignmentRepository;
import com.mac.care_point.service.employee_assignment.model.TEmployeeAssingment;
import com.mac.care_point.service.employee_bay_detail.TEmployeeBayService;
import com.mac.care_point.service.employee_bay_detail.model.TEmployeeBayDetail;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class VehicleAssignmentService {

    @Autowired
    private VehicleAssignmentRepository vehicleAssignmentRepository;

    @Autowired
    private JobCardRepository jobCardRepository;

    @Autowired
    private TEmployeeBayService employeeBayService;

    @Autowired
    private EmployeeAssignmentRepository employeeAssignmentRepository;

    @Autowired
    private BayRepository bayRepository;

    public List<TVehicleAssignment> findAll() {
        return vehicleAssignmentRepository.findAll();
    }

    public TVehicleAssignment saveDetail(TVehicleAssignment vehicleAssignment) {
        JobCard findOne = jobCardRepository.findOne(vehicleAssignment.getJobCard());
        findOne.setBay(vehicleAssignment.getBay());
        jobCardRepository.save(findOne);
        List<TVehicleAssignment> updatedObjects = vehicleAssignmentRepository.findTop1ByJobCardOrderByInTimeDesc(vehicleAssignment.getJobCard());

        System.out.println(vehicleAssignment.getBay());
        System.out.println(vehicleAssignment.getJobCard());

        saveEmployeeBayDetails(vehicleAssignment);

        if (!updatedObjects.isEmpty()) {
            TVehicleAssignment updateVehicleAssignment = updatedObjects.get(0);
            if (updateVehicleAssignment.getOutTime() == null) {
                updateVehicleAssignment.setOutTime(vehicleAssignment.getInTime());
            }
            vehicleAssignmentRepository.save(updateVehicleAssignment);
        }
        vehicleAssignment.setIndexNo(0);

        TVehicleAssignment save = vehicleAssignmentRepository.save(vehicleAssignment);
        return save;
    }

    public void deleteDetail(Integer indexNo) {
        vehicleAssignmentRepository.delete(indexNo);
    }

    public Integer getBayAssignVehicleCount(Integer bay, Integer branch) {
        return vehicleAssignmentRepository.getBayAssignVehicleCount(branch, Constant.FINISHE_STATUS, bay);
    }

    public List<TVehicleAssignment> findByJobCard(Integer indexNo) {
        return vehicleAssignmentRepository.findByJobCardOutTimeAsc(indexNo);
    }

    public TVehicleAssignment jobFinished(TVehicleAssignment vehicleAssignment) {
        List<TVehicleAssignment> list = vehicleAssignmentRepository.findTop1ByJobCardOrderByInTimeDesc(vehicleAssignment.getIndexNo());
        if (list.isEmpty()) {
            return null;
        }
        TVehicleAssignment finishObject = list.get(0);
        if (finishObject.getOutTime() == null) {
            finishObject.setOutTime(vehicleAssignment.getInTime());
            TVehicleAssignment save = vehicleAssignmentRepository.save(finishObject);
            return save;
        }
        return null;
    }

    private void saveEmployeeBayDetails(TVehicleAssignment vehicleAssignment) {
        Bay bay = bayRepository.findOne(vehicleAssignment.getBay());

        if (bay.getEmployeeIsView() == 1) {
            SimpleDateFormat dt1 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            System.out.println(dt1.format(new Date()));
            TEmployeeBayDetail employeeBayDetail = new TEmployeeBayDetail();
            employeeBayDetail.setBay(vehicleAssignment.getBay());
            employeeBayDetail.setDate(new Date());
            employeeBayDetail.setInTime(dt1.format(new Date()));
            employeeBayDetail.setIndexNo(0);//auto increment
            employeeBayDetail.setJobCard(vehicleAssignment.getJobCard());
            employeeBayDetail.setOutTime(null);
            employeeBayDetail.setStatus("PENDING");
            employeeBayDetail.setType(null);
            employeeBayDetail.setTypeDesc(null);

            List<TEmployeeAssingment> employeeList = employeeAssignmentRepository.findByBayAssignEmployee(vehicleAssignment.getBay(), new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            System.out.println(vehicleAssignment.getBay());
            System.out.println(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
            System.out.println(new Date());
            
            for (TEmployeeAssingment employee : employeeList) {
                employeeBayDetail.setEmployee(employee.getEmployee());
                employeeBayService.save(employeeBayDetail);
            }
        } else {
            //nothing to do
        }
    }
}
