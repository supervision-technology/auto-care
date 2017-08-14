/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.vehicle;

import com.mac.care_point.service.zmaster.vehicle.model.MVehicle;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface SVVehicleRepository extends JpaRepository<MVehicle, Integer>{

    public List<MVehicle> findVehicleByIndexNo(Integer indexNo);

    public MVehicle findVehicleByVehicleNo(String vehicleNo);

    public List<MVehicle> findByVehicleNo(String vehicleNo);
 
}
