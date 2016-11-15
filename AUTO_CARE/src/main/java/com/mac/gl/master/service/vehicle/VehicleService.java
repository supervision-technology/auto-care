/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.service.vehicle;

import com.mac.gl.master.model.vehicle.MVehicle;
import com.mac.gl.master.repository.vehicle.VehicleRepository;
import com.mac.gl.system.exception.DuplicateEntityException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Nidura Prageeth
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<MVehicle> findAll() {
        return vehicleRepository.findAll();
    }

    private MVehicle findByVehicleNo(String vehicleNo,String chassisNo,String engineNo) {
        List<MVehicle> vehicles = vehicleRepository.findByVehicleNoOrChassisNoOrEngineNo(vehicleNo, chassisNo, engineNo);
        if (vehicles.isEmpty()) {
            return null;
        }
        return vehicles.get(0);
    }

    public MVehicle saveVehicle(MVehicle vehicle) {
        MVehicle mVehicle = findByVehicleNo(vehicle.getVehicleNo(),vehicle.getChassisNo(),vehicle.getEngineNo());
        if (mVehicle == null) {
            return vehicleRepository.save(vehicle);
        } else {
            if (mVehicle.getIndexNo().equals(vehicle.getIndexNo())) {//is update get update Object?
                return vehicle;
            }
            throw new DuplicateEntityException("Vehicle already exists");
        }
    }

    public void deleteVehicle(Integer indexNo) {
        vehicleRepository.delete(indexNo);
    }

}
