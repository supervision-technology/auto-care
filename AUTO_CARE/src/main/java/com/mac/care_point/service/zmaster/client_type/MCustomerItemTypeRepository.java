/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.client_type;

import com.mac.care_point.service.zmaster.client_type.model.MCustomerType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kavish manjitha
 */
public interface MCustomerItemTypeRepository extends JpaRepository<MCustomerType, Integer>{
    
}
