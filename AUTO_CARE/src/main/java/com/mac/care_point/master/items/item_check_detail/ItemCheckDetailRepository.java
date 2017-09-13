/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.items.item_check_detail;

import com.mac.care_point.master.items.item_check_detail.model.MItemCheckDetail;
import org.springframework.data.jpa.repository.JpaRepository;



/**
 *
 * @author L T430
 */
public interface ItemCheckDetailRepository extends JpaRepository<MItemCheckDetail, Integer>{
    
}
