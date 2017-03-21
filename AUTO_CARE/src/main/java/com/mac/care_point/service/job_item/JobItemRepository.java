/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.TJobItem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kavish Manjitha
 */
public interface JobItemRepository extends JpaRepository<TJobItem, Integer> {
    
}
