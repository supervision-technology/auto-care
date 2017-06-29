/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicleAssignment;


import com.mac.care_point.master.vehicle.VehicleRepository;
import com.mac.care_point.master.vehicleAssignment.model.TVehicleAssignment;
import com.mac.care_point.service.common.Constant;
import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
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

    public List<TVehicleAssignment> findAll() {
        return vehicleAssignmentRepository.findAll();
    }

    public TVehicleAssignment saveDetail(TVehicleAssignment vehicleAssignment) {
        JobCard findOne = jobCardRepository.findOne(vehicleAssignment.getJobCard());
        findOne.setBay(vehicleAssignment.getBay());
        jobCardRepository.save(findOne);
        List<TVehicleAssignment> updatedObjects = vehicleAssignmentRepository.findTop1ByJobCardOrderByInTimeDesc(vehicleAssignment.getJobCard());

        if (!updatedObjects.isEmpty()) {
            TVehicleAssignment updateVehicleAssignment = updatedObjects.get(0);
            updateVehicleAssignment.setOutTime(vehicleAssignment.getInTime());
            vehicleAssignmentRepository.save(updatedObjects.get(0));
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
}
