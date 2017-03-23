/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client;

import com.mac.care_point.service.zmaster.client.model.MClient;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface SVClientRepository extends JpaRepository<MClient, Integer>{
    
}
