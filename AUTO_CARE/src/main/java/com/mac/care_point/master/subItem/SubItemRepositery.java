/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.subItem;

import com.mac.care_point.master.item.MSubItem;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalum
 */
public interface SubItemRepositery extends JpaRepository<MSubItem, Serializable>{
    
}
