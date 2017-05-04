/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.job_item;

import com.mac.care_point.service.job_item.model.CustomerReceiveItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Kavish Manjitha
 */
public interface ClientReceivedItemRepository extends JpaRepository<CustomerReceiveItem, Integer>{

    public List<CustomerReceiveItem> findByJobCard(Integer indexNo);
    
}
