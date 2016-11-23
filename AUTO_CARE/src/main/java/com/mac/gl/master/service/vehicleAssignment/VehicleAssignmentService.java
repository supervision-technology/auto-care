/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.vehicleAssignment;

import com.mac.gl.master.model.vehicleAssignment.TVehicleAssignment;
import com.mac.gl.master.repository.vehicleAssignment.VehicleAssignmentRepository;
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

    public List<TVehicleAssignment> findAll() {
        return vehicleAssignmentRepository.findAll();
    }
    public List<TVehicleAssignment> findByBrachAndDate(Integer branch,Date date) {
        return vehicleAssignmentRepository.findByBranchAndDate(branch,date);
    }

    public TVehicleAssignment saveDetail(TVehicleAssignment vehicleAssignment) {
        return vehicleAssignmentRepository.save(vehicleAssignment);
    }

    public void deleteDetail(Integer indexNo) {
        vehicleAssignmentRepository.delete(indexNo);
    }
}
