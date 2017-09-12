/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle;

import com.mac.care_point.service.zmaster.vehicle.model.MVehicle;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kalum
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/care-point/service/zmaster/vehicle")
public class SVVehicleController {
    @Autowired
    private SVVehicleService vehicleService;
    
    @RequestMapping(method = RequestMethod.GET) 
    public List<MVehicle> getAllVehicles(){
        return vehicleService.getAllVehicles();
    }
    @RequestMapping (value = "/save-vehicle", method = RequestMethod.POST)
    public MVehicle saveVehicle(@RequestBody MVehicle vehicle){
        return vehicleService.saveVehicle(vehicle);
    }
    
    @RequestMapping(value = "/search-vehicle/{indexNo}", method = RequestMethod.GET) 
    public MVehicle getAllVehiclesByID(@PathVariable Integer indexNo){
        return vehicleService.getVehicleById(indexNo);
    }
    @RequestMapping(value = "/search-vehicle-vehicleNo/{vehicleNo}", method = RequestMethod.GET) 
    public MVehicle getAllVehiclesByVehicleNo(@PathVariable String vehicleNo){
        return vehicleService.getVehicleByVehicleNo(vehicleNo);
    }
    @RequestMapping(value = "/search-vehicle-client/{client}", method = RequestMethod.GET) 
    public String getAllVehiclesByClient(@PathVariable Integer client){
        return vehicleService.getAllVehiclesByClient(client);
    }
}
