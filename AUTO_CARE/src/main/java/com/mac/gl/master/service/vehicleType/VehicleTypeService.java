/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.vehicleType;

import com.mac.gl.master.model.priceCategory.PriceCategory;
import com.mac.gl.master.model.vehicleType.VehicleType;
import com.mac.gl.master.repository.priceCategory.PriceCategoryRepository;
import com.mac.gl.master.repository.vehicleType.VehicleTypeRepository;
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
public class VehicleTypeService {
    
     @Autowired
    private VehicleTypeRepository vehicleTypeRepository;
    
     public List<VehicleType> findAll() {
        return vehicleTypeRepository.findAll();
    }

    public VehicleType saveDetail(VehicleType vehicleType) {
        return vehicleTypeRepository.save(vehicleType);
    }

    public void deleteDetail(Integer indexNo) {
        vehicleTypeRepository.delete(indexNo);
    }
}
