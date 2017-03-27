/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle_type;

import com.mac.care_point.service.zmaster.vehicle_type.model.MVehicleType;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/service/zmaster/vehicle-type")
public class SVVehicleTypeController {
    
    @Autowired
    private SVVehicleTypeService vehicleTypeService;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<MVehicleType> findAll() {
        return vehicleTypeService.findAll();
    }
}
