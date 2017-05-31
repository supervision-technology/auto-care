/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.vehicle_attenctions;

import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctions;
import com.mac.care_point.service.vehicle_attenctions.model.MVehicleAttenctionsCategory;
import com.mac.care_point.service.vehicle_attenctions.model.TJobVehicleAttenctions;
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

    public List<MVehicleAttenctions> findAllAtenctions() {
        return attenctionRepository.findAll();
    }

    public List<MVehicleAttenctionsCategory> findAllAtenctionsCategory() {
        return vehicleAttenctionCategoryRepository.findAll();
    }

    public List<TJobVehicleAttenctions> findByJobCard(Integer jobCard) {
        return jobVehicleAttenctionsRepository.findByJobCard(jobCard);
    }

    public TJobVehicleAttenctions saveTJobVehicleAttenctions(TJobVehicleAttenctions jobVehicleAttenctions) {
        return jobVehicleAttenctionsRepository.save(jobVehicleAttenctions);
    }

    public Integer deleteTJobVehicleAttenctions(Integer indexNo) {
        jobVehicleAttenctionsRepository.delete(indexNo);
        return indexNo;
    }

    public List<MVehicleAttenctions> findByCategory(Integer category) {
        return attenctionRepository.findByCategory(category);
    }

}
