/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle_type;

import com.mac.care_point.service.zmaster.vehicle_type.model.MVehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */

public interface SVVehicleTypeRepository extends JpaRepository<MVehicleType, Integer>{
    
}
