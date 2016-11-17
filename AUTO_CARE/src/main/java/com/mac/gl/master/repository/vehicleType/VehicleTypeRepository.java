/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.vehicleType;

import com.mac.gl.master.model.vehicleType.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface VehicleTypeRepository extends JpaRepository<VehicleType, Integer>{
    
}
