/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle_type;

import com.mac.care_point.service.zmaster.vehicle_type.model.MVehicleType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SVVehicleTypeService {
    
    @Autowired
    private SVVehicleTypeRepository vehicleTypeRepository;
    
    public List<MVehicleType> findAll() {
        return vehicleTypeRepository.findAll();
    }
}
