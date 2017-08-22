/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.vehicle;

import com.mac.care_point.master.vehicle.model.Vehicle;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Supervision
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle saveDetail(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteDetail(Integer indexNo) {
         try {
        vehicleRepository.delete(indexNo);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete this vehicle because there are details in other transaction");
        }
    }

    public List<Vehicle> findByVehicleNo(String vehicleNo) {
        //default user input ex:KR8755
        String vehicleNo1 = vehicleNo;
        //add separator at 2nd index, ex:KR-8755
        String vehicleNo2 = vehicleNo.length() > 2 ? vehicleNo.substring(0, 2) + "-" + vehicleNo.substring(2) : vehicleNo;
        //add separator at 3r index, ex:KR8-755, 250-8466
        String vehicleNo3 = vehicleNo.length() > 3 ? vehicleNo.substring(0, 3) + "-" + vehicleNo.substring(3) : vehicleNo;

        return vehicleRepository.findByVehicleNoLikeLimit10(vehicleNo1, vehicleNo2, vehicleNo3);
    }
}
