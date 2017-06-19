/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.vehicle_attenctions;

import com.mac.care_point.service.job_card.JobCardRepository;
import com.mac.care_point.service.job_card.model.JobCard;
import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctions;
import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctionsCategory;
import com.mac.care_point.service.vehicle_attenctions.model.TJobVehicleAttenctions;
import com.mac.care_point.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author kavish manjitha
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MVehicleAttenctionService {

    @Autowired
    private MVehicleAttenctionCategoryRepository vehicleAttenctionCategoryRepository;

    @Autowired
    private MVehicleAttenctionRepository attenctionRepository;

    @Autowired
    private TJobVehicleAttenctionsRepository jobVehicleAttenctionsRepository;

    @Autowired
    private JobCardRepository jobCardRepository;

    public List<MVehicleAttenctions> findAllAtenctions() {
        return attenctionRepository.findAll();
    }

    public List<MVehicleAttenctionsCategory> findAllAtenctionsCategory() {
        return vehicleAttenctionCategoryRepository.findAll();
    }

    public List<TJobVehicleAttenctions> findByJobCardAndVehicleAttenctionsCategory(Integer category, Integer jobCard) {
        return jobVehicleAttenctionsRepository.findByJobCardAndVehicleAttenctionsCategory(jobCard, category);
    }

    @Transactional
    public TJobVehicleAttenctions saveTJobVehicleAttenctions(TJobVehicleAttenctions jobVehicleAttenctions) {
        
        //update attenctions status true
        JobCard getJobCard = jobCardRepository.getOne(jobVehicleAttenctions.getJobCard());
        getJobCard.setAttenctions(Boolean.TRUE);
        
        return jobVehicleAttenctionsRepository.save(jobVehicleAttenctions);
    }

    @Transactional
    public void fillTJobVehicleAttenctions(Integer jobCard) {
        //check allrady exsist data
        List<TJobVehicleAttenctions> getJobCardData = jobVehicleAttenctionsRepository.findByJobCard(jobCard);
        if (getJobCardData.isEmpty()) {
            List< MVehicleAttenctions> vehicleAttenctionsList = attenctionRepository.findAll();
            for (MVehicleAttenctions mVehicleAttenctions : vehicleAttenctionsList) {

                TJobVehicleAttenctions jobVehicleAttenctions = new TJobVehicleAttenctions();
                jobVehicleAttenctions.setJobCard(jobCard);
                jobVehicleAttenctions.setVehicleAttenctions(mVehicleAttenctions.getIndexNo());
                jobVehicleAttenctions.setVehicleAttenctionsCategory(mVehicleAttenctions.getCategory());
                jobVehicleAttenctionsRepository.save(jobVehicleAttenctions);
            }
        } else {
            throw new DuplicateEntityException("Duplicate Data");
        }
    }

    public List<TJobVehicleAttenctions> getLastJobCardVehicle(Integer vehicle) {
        Integer getLastJobCardIndexNo = jobVehicleAttenctionsRepository.getLastJobCardVehicle(vehicle);
        return jobVehicleAttenctionsRepository.findByJobCardAndStatusNotNull(getLastJobCardIndexNo);
    }

}
