/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.stock;

import com.mac.care_point.service.stock.transfer.model.MStore;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 *
 * @author L T430
 */

public interface MStockRepository extends JpaRepository<MStore, Integer>{
    
}
