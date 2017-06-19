/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.daily_check_list;

import com.mac.care_point.service.daily_check_list.model.TSubItemCheckResult;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kalum
 */
public interface SubItemCheckResultRepository extends JpaRepository<TSubItemCheckResult, Integer>{    
}
