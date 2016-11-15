/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.client;

import com.mac.gl.master.model.vehicle.MVehicle;
import com.mac.gl.master.model.client.MClient;
import com.mac.gl.master.service.vehicle.VehicleService;
import com.mac.gl.master.service.client.VehicleOwnerService;
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
 * @author Supervision
 */
@CrossOrigin
@RestController
@RequestMapping("/api/green-leaves/master/vehicle-owner")
public class VehicleOwnerController {
    @Autowired
    private VehicleOwnerService vehicleOwnerService;

    @RequestMapping(method = RequestMethod.GET)
    public List<MClient> findAll() {
        return vehicleOwnerService.findAll();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public MClient saveVehicleOwner(@RequestBody MClient vehicleOwner) {       
        return vehicleOwnerService.saveVehicleOwner(vehicleOwner);
    }

    @RequestMapping(value = "/delete-vehicle-owner/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteVehicleOwner(@PathVariable Integer indexNo) {
        System.out.println(indexNo);
        vehicleOwnerService.deleteVehicleOwner(indexNo);
        return indexNo;
        
    }
}
