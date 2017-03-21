/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle;

import com.mac.care_point.service.zmaster.vehicle.model.MVehicle;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Kalum
 */
@Service
public class SVVehicleService {

    @Autowired
    private SVVehicleRepository vehicleRepository;
    
    List<MVehicle> getVehicleById(String vehicleNo) {
        return vehicleRepository.findVehicleByVehicleNo(vehicleNo);
    }
    
}
