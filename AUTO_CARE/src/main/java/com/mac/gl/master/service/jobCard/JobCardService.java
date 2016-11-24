/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.jobCard;

import com.mac.gl.master.model.jobCard.JobCard;
import com.mac.gl.master.model.vehicle.Vehicle;
import com.mac.gl.master.repository.jobCard.JobCardRepository;
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
public class JobCardService {

    @Autowired
    private JobCardRepository jobCardRepository;

    public List<JobCard> findAll() {
        return jobCardRepository.findAll();
    }

    public JobCard saveItemDepartment(JobCard departmentModal) {
        return jobCardRepository.save(departmentModal);
    }

    public void deleteItemDepartment(Integer indexNo) {
        jobCardRepository.delete(indexNo);
    }

    public List<JobCard> findByVehicle(Vehicle vehicle) {
        return jobCardRepository.findTop5ByVehicle(vehicle);
    }
}
