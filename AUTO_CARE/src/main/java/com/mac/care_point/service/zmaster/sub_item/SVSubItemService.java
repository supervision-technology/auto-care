/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.care_point.service.zmaster.sub_item;

import com.mac.care_point.service.zmaster.sub_item.model.MSubItem;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalum
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SVSubItemService {
    
    @Autowired 
    private SVSubItemRepository subItemRepository;
    
    public List<Object[]> getItems(){
        return subItemRepository.getItems();
    }

    public List<MSubItem> getAllSubItem() {
        return subItemRepository.findAll();
    }

    public List<MSubItem> getSubItemGroupByItem(Integer item) {
        return subItemRepository.findByItem(item);
    }
    
}
