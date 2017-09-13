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
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SVVehicleService {

    @Autowired
    private SVVehicleRepository vehicleRepository;

    public List<MVehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public MVehicle getVehicleById(Integer indexNo) {
        return vehicleRepository.findOne(indexNo);
    }

    public MVehicle saveVehicle(MVehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public MVehicle getVehicleByVehicleNo(String vehicleNo) {
        return vehicleRepository.findVehicleByVehicleNo(vehicleNo);
    }

    public String getAllVehiclesByClient(Integer client) {
        return vehicleRepository.getAllVehiclesByClient(client);
    }

    public List<String> getBrandList() {
        return vehicleRepository.getBrandList();
    }

    public List<String> getModelList() {
        return vehicleRepository.getModelList();
    }

    public List<String> getFuelTypeList() {
        return vehicleRepository.getFuelTypeList();
    }
   
    public List<MVehicle> findByIsNewVehicle() {
        return vehicleRepository.findByIsNewOrderByVehicleNo(true);
    }
}
