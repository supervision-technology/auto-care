/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.gl.master.repository.vehicle_owner;

import com.mac.gl.master.model.client.MClient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface VehicleOwnerRepository extends JpaRepository<MClient, Integer> {
    
     public List<MClient> findByNicNumberAndMobileNumber(String nic,String mobile);
     
}
