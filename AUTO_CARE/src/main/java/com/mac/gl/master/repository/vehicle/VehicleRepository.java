/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.vehicle;

import com.mac.gl.master.model.vehicle.MVehicle;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Nidura Prageeth
 */
public interface VehicleRepository extends JpaRepository<MVehicle, Integer>{
    
     public List<MVehicle> findByVehicleNoOrChassisNoOrEngineNo(String vehicleNo,String chassisNo,String engineNo);
    
}
