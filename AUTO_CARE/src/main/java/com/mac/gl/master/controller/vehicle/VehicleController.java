/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.vehicle;

import com.mac.gl.master.model.vehicle.MVehicle;
import com.mac.gl.master.service.vehicle.VehicleService;
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
 * @author Nidura Prageeth
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MVehicle> findAll() {
        return vehicleService.findAll();
    }

    @RequestMapping(value = "/save-vehicle", method = RequestMethod.POST)
    public MVehicle saveVehicle(@RequestBody MVehicle vehicle) {
        return vehicleService.saveVehicle(vehicle);
    }

    @RequestMapping(value = "/delete-vehicle/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteVehicle(@PathVariable Integer indexNo) {
        vehicleService.deleteVehicle(indexNo);
        return indexNo;
    }

}
