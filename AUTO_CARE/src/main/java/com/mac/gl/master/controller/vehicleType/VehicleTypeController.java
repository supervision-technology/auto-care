/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.controller.vehicleType;

import com.mac.gl.master.model.priceCategory.PriceCategory;
import com.mac.gl.master.model.vehicleType.VehicleType;
import com.mac.gl.master.service.priceCategory.PriceCategoryService;
import com.mac.gl.master.service.vehicleType.VehicleTypeService;
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
@RequestMapping("/api/green-leaves/master/vehicle-type")
public class VehicleTypeController {
    @Autowired
    private VehicleTypeService vehicleTypeService;

    @RequestMapping(method = RequestMethod.GET)
    public List<VehicleType> findAll() {
        return vehicleTypeService.findAll();
    }

    @RequestMapping(value = "/insert-detail", method = RequestMethod.POST)
    public VehicleType insertDetail(@RequestBody VehicleType vehicleType) {
        return vehicleTypeService.saveDetail(vehicleType);
    }

    @RequestMapping(value = "/delete-detail/{indexNo}", method = RequestMethod.DELETE)
    public Integer deleteDetail(@PathVariable Integer indexNo) {
        vehicleTypeService.deleteDetail(indexNo);

        return indexNo;
    }
}
