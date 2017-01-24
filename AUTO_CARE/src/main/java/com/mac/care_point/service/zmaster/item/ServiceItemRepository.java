/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.item;

import com.mac.care_point.service.zmaster.item.model.MItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Don
 */

public interface ServiceItemRepository extends JpaRepository<MItem, Integer>{
    
}
