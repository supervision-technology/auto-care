/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.master.reOrderLevel;

import com.mac.care_point.master.reOrderLevel.model.MReOrderLevel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author L T430
 */

public interface ReOrderRepository extends JpaRepository<MReOrderLevel, Integer>{

    public List<MReOrderLevel> findByBranchAndItem(Integer branch, Integer item);
    
}
