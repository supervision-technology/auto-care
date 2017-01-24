/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.jobCard;

import com.mac.care_point.master.model.vehicle.Vehicle;
import com.mac.care_point.master.repository.vehicle.VehicleRepository;
import com.mac.care_point.service.jobCard.model.JobCard;
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

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<JobCard> findAll() {
        return jobCardRepository.findAll();
    }

    public List<JobCard> findByVehicle(String vehicleNo) {
        Vehicle vehicle = vehicleRepository.findByVehicleNo(vehicleNo);
        return jobCardRepository.findByVehicle(vehicle.getIndexNo());
    }

    public JobCard saveJobCard(JobCard jobCard) {
        Integer maxNumber = jobCardRepository.getMaximumNumberByBranch(jobCard.getBranch());
        if (maxNumber == null) {
            maxNumber = 0;
        }
        jobCard.setNumber(maxNumber + 1);
        System.out.println("create new transaction number");
        return jobCardRepository.save(jobCard);
    }

    public void deleteItemDepartment(Integer indexNo) {
        jobCardRepository.delete(indexNo);
    }

    public List<JobCard> findByVehicle(Integer vehicle) {
        return jobCardRepository.findByVehicle(vehicle);
    }
}
